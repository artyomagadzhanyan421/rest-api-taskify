# REST API for Taskify

This is the backend API for the Taskify project, a task management application. The API allows users to create, read, update, and delete tasks while handling authentication.

* User authentication (Sign Up, Sign In)
* CRUD operations for tasks (Create, Read, Update, Delete)
* Secure endpoints using JWT authentication
* MongoDB database for storing users and tasks

## API Endpoints

* POST Sign Up endpoint: /signup
* Description: Create a new user account
* Activation: Use Body request tab

``` json
// Enter credentials

{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

``` json
// Response

{
  "message": "User registered successfully"
}
```