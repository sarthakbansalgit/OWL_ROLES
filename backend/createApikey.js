import { B2B_API_KEY } from './utils/b2bconstants.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Configure path resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Displays the B2B API key from the constants file
 */
const displayApiKey = () => {
  try {
    console.log('\n===============================');
    console.log('B2B API KEY INFORMATION');
    console.log('===============================');
    
    if (!B2B_API_KEY) {
      console.error('Error: B2B_API_KEY is not defined in b2bconstants.js');
    } else {
      console.log(`B2B API Key: ${B2B_API_KEY}`);
      console.log('\nThis is your B2B API endpoint key.');
      console.log('Use this key in API requests with header: x-api-key');
      console.log('\nAvailable Routes:');
      console.log('GET /api/v1/b2b/job-market');
      console.log('GET /api/v1/b2b/applications');
      console.log('GET /api/v1/b2b/industry-trends');
      console.log('GET /api/v1/b2b/time-trends?period=[day|week|month]');
    }
    
    console.log('===============================');
    
  } catch (error) {
    console.error('Error retrieving API key:', error);
  }
};

displayApiKey();