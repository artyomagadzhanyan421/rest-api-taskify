# **Taskify REST API**  

This is the backend API for the **Taskify** project, a task management application. The API allows users to create, read, update, and delete tasks while handling authentication.  

## **Features**
- User authentication (Sign Up, Sign In)  
- CRUD operations for tasks (Create, Read, Update, Delete)  
- Secure endpoints using JWT authentication  
- MongoDB database for storing users and tasks  

## **API Endpoints**  

### **Authentication**  

#### **1. Sign Up**  
**Endpoint:** `POST /signup`  
**Description:** Create a new user account.  
**Request Body:**  
```json
{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword"
}