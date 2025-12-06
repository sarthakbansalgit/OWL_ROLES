import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Create reports directory if it doesn't exist
const reportsDir = path.join(rootDir, 'reports');
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

console.log('Generating backend test report...');

try {
  // Create timestamped directory for this report
  const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\..+/, '');
  const reportDir = path.join(reportsDir, `test-report-${timestamp}`);
  fs.mkdirSync(reportDir, { recursive: true });
  
  // Run tests with json reporter output
  const reportPath = path.join(reportDir, 'test-results.json');
  
  // Run Jest with JSON reporter
  execSync(`npm test -- --json --outputFile="${reportPath}"`, {
    stdio: 'inherit',
    cwd: rootDir
  });

  // Read the JSON report
  const testResults = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
  
  // Generate HTML report
  const htmlReport = generateHtmlReport(testResults, timestamp);
  fs.writeFileSync(path.join(reportDir, 'test-results.html'), htmlReport);
  
  // Generate summary
  const summary = {
    timestamp: timestamp,
    numTotalTests: testResults.numTotalTests,
    numPassedTests: testResults.numPassedTests,
    numFailedTests: testResults.numFailedTests,
    numPendingTests: testResults.numPendingTests,
    success: testResults.success,
    testResults: testResults.testResults.map(result => ({
      name: result.name,
      status: result.status,
      assertionResults: result.assertionResults.map(assertion => ({
        title: assertion.title,
        status: assertion.status,
        failureMessages: assertion.failureMessages
      }))
    }))
  };
  
  fs.writeFileSync(
    path.join(reportDir, 'summary.json'),
    JSON.stringify(summary, null, 2)
  );
  
  console.log(`Test report generated successfully at: ${reportDir}`);
  console.log(`You can view the HTML report at: ${path.join(reportDir, 'test-results.html')}`);
  
  // Create symlink to latest report
  const latestLink = path.join(reportsDir, 'latest');
  if (fs.existsSync(latestLink)) {
    fs.unlinkSync(latestLink);
  }
  
  fs.symlinkSync(reportDir, latestLink, 'junction');
  console.log(`Latest report symlink created at: ${latestLink}`);
  
  // Store report info in a variable instead of returning
  const reportInfo = {
    success: true,
    reportDirectory: reportDir,
    htmlReportPath: path.join(reportDir, 'test-results.html')
  };
  
  // Write report info to a status file
  fs.writeFileSync(
    path.join(reportsDir, 'last-report-status.json'),
    JSON.stringify(reportInfo, null, 2)
  );
  
} catch (error) {
  console.error('Error generating test report:', error.message);
  
  // Create an error report
  const errorReport = {
    timestamp: new Date().toISOString(),
    result: 'Tests failed',
    error: error.message
  };
  
  fs.writeFileSync(
    path.join(reportsDir, 'test-error.json'), 
    JSON.stringify(errorReport, null, 2)
  );
  
  console.log(`Error report saved to 'reports/test-error.json'`);
  process.exit(1);
}

// Function to generate HTML report
function generateHtmlReport(testResults, timestamp) {
  const passRate = testResults.numTotalTests > 0 
    ? Math.round((testResults.numPassedTests / testResults.numTotalTests) * 100) 
    : 0;
  
  const getStatusClass = status => {
    switch(status) {
      case 'passed': return 'success';
      case 'failed': return 'danger';
      case 'pending': return 'warning';
      default: return 'secondary';
    }
  };
  
  let testsHtml = '';
  
  testResults.testResults.forEach(testFile => {
    testsHtml += `
      <div class="card mb-3">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h5>${path.relative(rootDir, testFile.name)}</h5>
          <span class="badge bg-${testFile.status === 'passed' ? 'success' : 'danger'}">${testFile.status}</span>
        </div>
        <div class="card-body">
          <ul class="list-group">
    `;
    
    testFile.assertionResults.forEach(test => {
      testsHtml += `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          ${test.title}
          <span class="badge bg-${getStatusClass(test.status)}">${test.status}</span>
        </li>
      `;
      
      if (test.failureMessages && test.failureMessages.length > 0) {
        testsHtml += `
          <li class="list-group-item bg-light">
            <pre class="text-danger mb-0">${escapeHtml(test.failureMessages.join('\n\n'))}</pre>
          </li>
        `;
      }
    });
    
    testsHtml += `
          </ul>
        </div>
      </div>
    `;
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Backend Test Report - ${timestamp}</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body { padding: 20px; }
    .test-summary { gap: 10px; }
    .summary-card { text-align: center; padding: 15px; border-radius: 5px; }
    .progress { height: 25px; }
    .progress-bar { font-size: 14px; line-height: 25px; }
  </style>
</head>
<body>
  <div class="container">
    <h1 class="mb-4">Backend Test Report</h1>
    <p class="text-muted">Generated on: ${new Date(timestamp).toLocaleString()}</p>
    
    <div class="row mb-4">
      <div class="col-md-3">
        <div class="card summary-card bg-light">
          <h3>${testResults.numTotalTests}</h3>
          <div>Total Tests</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card summary-card text-white bg-success">
          <h3>${testResults.numPassedTests}</h3>
          <div>Passed</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card summary-card text-white bg-danger">
          <h3>${testResults.numFailedTests}</h3>
          <div>Failed</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card summary-card text-white bg-warning">
          <h3>${testResults.numPendingTests}</h3>
          <div>Pending</div>
        </div>
      </div>
    </div>
    
    <div class="mb-4">
      <h5>Pass Rate: ${passRate}%</h5>
      <div class="progress">
        <div class="progress-bar bg-success" role="progressbar" style="width: ${passRate}%" 
             aria-valuenow="${passRate}" aria-valuemin="0" aria-valuemax="100">${passRate}%</div>
      </div>
    </div>
    
    <h2 class="mb-3">Test Results</h2>
    ${testsHtml}
  </div>
</body>
</html>`;
}

// Helper function to escape HTML
function escapeHtml(unsafe) {
  return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
} 