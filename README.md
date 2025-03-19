# Taskify REST API  

![Static Badge](https://img.shields.io/badge/20.16.0-green?label=node)
![Static Badge](https://img.shields.io/badge/%5E3.0.2-green?label=bcryptjs)
![Static Badge](https://img.shields.io/badge/%5E2.8.5-green?label=cors)
![Static Badge](https://img.shields.io/badge/%5E16.4.7-yellow?label=dotenv)
![Static Badge](https://img.shields.io/badge/%5E4.21.2-white?label=express)
![Static Badge](https://img.shields.io/badge/%5E9.0.2-white?label=jsonwebtoken)
![Static Badge](https://img.shields.io/badge/%5E8.12.1-limegreen?label=mongoose)
![Static Badge](https://img.shields.io/badge/%5E3.1.9-olivedrab?label=nodemon)

This is the backend API for the **Taskify** project, a task management application. The API allows users to create, read, update, and delete tasks while handling authentication.  

> [!IMPORTANT]  
> Ensure you have the latest versions of [Node.js](https://nodejs.org/) and [Git](https://git-scm.com/) installed before proceeding.

### Features
- User authentication (Sign Up, Sign In)  
- CRUD operations for tasks (Create, Read, Update, Delete)  
- Secure endpoints using JWT authentication  
- MongoDB database for storing users and tasks

### Tech Stack
- [Node.js](https://github.com/nodejs/node.git) + [Express.js](https://github.com/expressjs/express.git)
- [Mongoose](https://github.com/Automattic/mongoose.git) for storing user and task data
- [JWT](https://github.com/auth0/node-jsonwebtoken.git) for authentication and secure access control
- [bcrypt.js](https://github.com/kelektiv/node.bcrypt.js.git) for password hashing and securely storing passwords
- [Dotenv](https://github.com/motdotla/dotenv.git) for managing environment variables securely

### Installation & Setup

> [!IMPORTANT]  
> Ensure you've created an account on [MongoDB](https://www.mongodb.com/) before proceeding.

**1. MongoDB Atlas (Cloud Database)**
- Create a free account at MongoDB Atlas
- Create a new cluster and database
- Get your connection string (formatted as ```mongodb+srv://<username>:<db_password>@<clustername>.gdbya.mongodb.net/<dbname>```).
- Replace ```<username>```, ```<password>```, ```<clustername>``` and ```<dbname>``` with your actual details
- Add this connection string as ```MONGO_URI``` and ```JWT_SECRET``` in your ```.env``` file