# 🧪 Backend Testing Guide
This project uses Jest for backend testing.

## 📦 Install Dependencies
Make sure all dependencies are installed:

```bash
npm install
```

## 🧪 Run Tests
To run all tests:
```bash
npm test
```

To watch tests as you develop:
```bash
npm run test:watch
```

## 📄 To generate test reports 
Go to the `__tests__` folder as working directory in backend:
```bash
cd backend\__tests__\generateTestReport.js
```

Run the `.bat` script for windows:
```bash
./generateTestReport.bat
```
Run the `.sh` script for Linux:
```
./generateTestReport.sh
```

Find the report folder in the Backend folder. You can find the report in json or you can use the interactive html file using live server extension. 
Html file is present in `backend\reports\latest\`