# 🚀 Project Overview

This project combines a robust NestJS backend with a modern Next.js frontend to deliver a seamless authentication and workspace management solution.

## 🛠️ Technologies Used

### 🔒 Backend
- **NestJS** - A powerful Node.js framework enabling efficient and scalable server-side applications
- **Mongoose** - Elegant MongoDB object modeling for Node.js
- **Passport** - Flexible authentication middleware with JWT strategy support
- **bcrypt** - Industry-standard password hashing library
- **dotenv** - Simple environment variable management

### 💻 Frontend
- **Next.js** - Production-grade React framework with SSR and static generation
- **React** - Leading JavaScript library for dynamic user interfaces
- **Axios** - Feature-rich HTTP client for seamless API integration
- **Tailwind CSS** - Modern utility-first styling framework
- **React Hook Form** - Performant form state management and validation

## 🔗 API Documentation

### 🔑 Authentication

- **POST /auth/signup**
  - **Description**: Register new users with email and password
  - **Response**: Returns user data and authentication token
  - **Example**:
    ```http
    POST /auth/signup
    Content-Type: application/json

    {
      "email": "example@example.com",
      "name": "John",
      "surname": "Doe",
      "password": "securePassword123"
    }
    ```
    - **Status**: `201 Created`
    - **Response**:
      ```json
      {
        "user_id": "12345",
        "access_token": "jwt.token.here"
      }
      ```

- **POST /auth/login**
  - **Description**: Authenticate existing users
  - **Response**: Returns JWT for authorized access
  - **Example**:
    ```http
    POST /auth/login
    Content-Type: application/json

    {
      "email": "example@example.com",
      "password": "securePassword123"
    }
    ```
    - **Status**: `200 OK`
    - **Response**:
      ```json
      {
        "user_id": "12345",
        "access_token": "jwt.token.here"
      }
      ```

- **GET /auth/verify**
  - **Description**: Validate JWT tokens
  - **Response**: Confirms authentication status
  - **Example**:
    ```http
    GET /auth/verify
    Authorization: Bearer jwt.token.here
    ```
    - **Status**: `200 OK`
    - **Response**:
      ```json
      {
        "statusCode": 200,
        "message": "Token is valid"
      }
      ```

### 👤 Users

- **GET /users/getMe**
  - **Description**: Fetch authenticated user profile
  - **Response**: Requires valid JWT
  - **Example**:
    ```http
    GET /users/getMe
    Authorization: Bearer jwt.token.here
    ```
    - **Status**: `200 OK`
    - **Response**:
      ```json
      {
        "email": "example@example.com",
        "name": "John",
        "surname": "Doe"
      }
      ```

- **POST /users/verify-email**
  - **Description**: Check email availability
  - **Response**: Returns registration eligibility
  - **Example**:
    ```http
    POST /users/verify-email
    Content-Type: application/json

    {
      "email": "example@example.com"
    }
    ```
    - **Status**: `200 OK` or `400 Bad Request`
    - **Response**:
      ```json
      {
        "statusCode": 200,
        "message": "Email is not used"
      }
      ```

### 🏢 Workspaces

- **GET /workspaces**
  - **Description**: List all user workspaces
  - **Response**: Requires authentication
  - **Example**:
    ```http
    GET /workspaces
    Authorization: Bearer jwt.token.here
    ```
    - **Status**: `200 OK`
    - **Response**:
      ```json
      [
        {
          "name": "Workspace 1",
          "slug": "workspace-1"
        },
        {
          "name": "Workspace 2",
          "slug": "workspace-2"
        }
      ]
      ```

- **POST /workspaces/create**
  - **Description**: Create new workspace
  - **Response**: Validates workspace details
  - **Example**:
    ```http
    POST /workspaces/create
    Authorization: Bearer jwt.token.here
    Content-Type: application/json

    {
      "name": "New Workspace",
      "slug": "new-workspace"
    }
    ```
    - **Status**: `201 Created`
    - **Response**:
      ```json
      {
        "name": "New Workspace",
        "slug": "new-workspace"
      }
      ```

- **GET /workspaces/:slug**
  - **Description**: Retrieve specific workspace
  - **Response**: Access by unique slug
  - **Example**:
    ```http
    GET /workspaces/workspace-1
    Authorization: Bearer jwt.token.here
    ```
    - **Status**: `200 OK`
    - **Response**:
      ```json
      {
        "name": "Workspace 1",
        "slug": "workspace-1"
      }
      ```

- **GET /workspaces/check-slug/:slug**
  - **Description**: Verify slug availability
  - **Response**: Ensures unique workspace URLs
  - **Example**:
    ```http
    GET /workspaces/check-slug/new-workspace
    ```
    - **Status**: `200 OK`
    - **Response**:
      ```json
      {
        "suggestions": [],
        "error": null
      }
      ```

- **DELETE /workspaces/:slug**
  - **Description**: Remove workspace
  - **Response**: Requires ownership verification
  - **Example**:
    ```http
    DELETE /workspaces/workspace-1
    Authorization: Bearer jwt.token.here
    ```
    - **Status**: `204 No Content`