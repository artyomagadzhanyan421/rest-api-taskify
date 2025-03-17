# REST API for Taskify

This is the backend API for the Taskify project, a task management application. The API allows users to create, read, update, and delete tasks while handling authentication.

* User authentication (Sign Up, Sign In)
* CRUD operations for tasks (Create, Read, Update, Delete)
* Secure endpoints using JWT authentication
* MongoDB database for storing users and tasks

## Authentication Endpoints

* POST Sign Up endpoint: "/signup"
* Description: Create a new user account

Use Body request tab

``` json
{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

Response

``` json

{
  "message": "User created successfully"
}
```

* POST Sign In endpoint: "/signin"
* Description: Log in and receive an authentication token

Use Body request tab

``` json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

Responsse

``` json
{
    "message": "Sign-in successful!",
    "token": "your-jwt-token",
    "username": "johndoe",
    "name": "John Doe"
}
```

* GET Sign In endpoint: "/"
* Description: Enter account with an authentication token

Use Authorization tab, choose Bearer Token in your Type dropdown

```
Authorization: Bearer <your-jwt-token>
```