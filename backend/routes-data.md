# API Endpoints Documentation

## User Routes

- **POST** `/user/register`  
  Register a new user (requires file upload for profile picture).

- **POST** `/user/login`  
  Log in a user.

- **GET** `/user/logout`  
  Log out a user.

- **POST** `/user/profile/update`  
  Update user profile (requires authentication and optional file upload).

---

## Company Routes

- **POST** `/company/register`  
  Register a new company (requires authentication).

- **GET** `/company/get`  
  Get all registered companies.

- **GET** `/company/get/:id`  
  Get company by ID.

- **PUT** `/company/update/:id`  
  Update company details (requires authentication and file upload).

---

## Job Routes

- **POST** `/job/post`  
  Post a new job (requires authentication).

- **GET** `/job/get`  
  Get all job listings (requires authentication).

- **GET** `/job/getadminjobs`  
  Get all jobs posted by admin (requires authentication).

- **GET** `/job/get/:id`  
  Get job details by job ID (requires authentication).

---

## Application Routes

- **POST** `/application/apply/:id`  
  Apply for a job (requires authentication).

- **GET** `/application/get`  
  Get all jobs applied by the user (requires authentication).

- **GET** `/application/:id/applicants`  
  Get all applicants for a specific job (requires authentication).

- **PATCH** `/application/status/:id/update`  
  Update the status of an application (accept/reject) (requires authentication).

- **DELETE** `/application/withdraw/:id`  
  Withdraw a job application (requires authentication).

- **DELETE** `/application/delete/:id`  
  Delete an application as a recruiter (requires authentication).

- **PATCH** `/application/status/:id`  
  Accept or reject an application as a recruiter (requires authentication).
