# College Appointment System - Backend API Documentation

This repository provides the backend APIs for a College Appointment System that 
allows students to book appointments with professors. The system supports professor 
availability management, student authentication, appointment booking, and cancellation. 
The backend is built using **Node.js**, **Express.js**, and **MongoDB**.

## **Table of Contents**
1. [Introduction](#introduction)
2. [API Endpoints](#api-endpoints)
    - [Authentication](#authentication)
    - [Professor Availability](#professor-availability)
    - [Appointments](#appointments)
3. [Database Setup](#database-setup)
4. [Environment Configuration](#environment-configuration)
5. [Running the Application](#running-the-application)
6. [Testing](#testing)

---

## **1. Introduction**

This system allows students to book appointments with professors based on their availability. 
Professors can specify their available time slots, and students can book an appointment based on 
those slots. The system also includes the functionality to cancel appointments and view existing appointments.

### **Features:**

- Students can register, log in, and view professor availability.
- Professors can register, log in, and manage their available time slots.
- Students can book and cancel appointments with professors.
- Professors can view and cancel appointments.

---

## **2. API Endpoints**

### **Authentication**

- **POST** `/api/auth/register`  
  Register a new user (student or professor).  
  **Request Body**:  
  ```json
  {
      "name": "exampleUser",
      "password": "examplePassword",
      "password"
      "role": "student/professor"
  }

- **POST** `/api/auth/login`  
  Log in an existing user.
  **Request Body**:  
  ```json
  {
    "email": "john@gmail.com",
    "password": "password"
  }

### **Response for login**:
``` json
{
    "token": "a_jwt_token_will_be_displayed_here"
}
```

### **Professor Availability**

- **POST** `/api/availability`  
  Professor adds an available time slot.
  Authorization: Bearer token (Only accessible to professors)
  **Request Body**:  
  ```json
  {
    "startTime": "2024-12-20T09:00:00Z",
    "endTime": "2024-12-20T11:00:00Z"
  }
  
- **GET** `/api/availability/:professorId`
  Get all available time slots for a specific professor.
  Authorization: Bearer token (Only accessible to authenticated users)
  **Request Body**:
  ```
  [
      {
          "professorId": "123456",
          "startTime": "2024-12-20T09:00:00Z",
          "endTime": "2024-12-20T11:00:00Z"
      }
  ]
  ```
  
### **Appointments**

- **POST** `/api/appointments`
  Student books an appointment with a professor.
  Authorization: Bearer token (Only accessible to students)
  **Request Body**:
  ```
  {
      "professorId": "123456",
      "startTime": "2024-12-20T09:00:00Z"
  }
  ```
  
- **DELETE** `/api/appointments/:id`
  Student cancels their appointment.
  Authorization: Bearer token (Only accessible to students who made the appointment)
  **Request Body**:
  ```
    {
      "appointmentId": "appointment123"
    }

- **GET** `/api/appointments`
  Get all appointments for the authenticated student.
  Authorization: Bearer token (Only accessible to authenticated users)
  **Response**:
  ```
  [
      {
          "appointmentId": "appointment123",
          "professorId": "123456",
          "startTime": "2024-12-20T09:00:00Z"
      }
  ]
  ```
  
## **3. Database Setup (MongoDB)**

### **Required Collections**:
  Users Collection: Stores user data (students and professors).
  Availability Collection: Stores the availability slots for professors.
  Appointments Collection: Stores the appointments booked by students.
  
## **4. Environment Configuration**

  To set up the environment variables, create a .env file in the root directory of the project. Here’s an example of the configuration:
  .env
  ```
    DB_URI=mongodb://localhost:27017/college-appointment-system (use this for local setup)
    JWT_SECRET: Secret key used for signing JWT tokens.
  ```

## **5. Running the Application**

### **1. Install Dependencies**

  To install the required dependencies, run the following command:
  ```
    npm install
  ```

### **2. Start the Application**

  To start the application, use the following command:
  ```    
    npm start
  ```

  By default, the app will be available at http://localhost:3000.

## **6. Testing**
  End-to-End (E2E) Test
  The system includes an E2E test to ensure the functionality of booking an appointment. You can run the tests using:
  ```
  npm run test
  ```

  The test suite uses Jest and Supertest for API testing.
