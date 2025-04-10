# Taskify REST API  

![Static Badge](https://img.shields.io/badge/20.16.0-green?label=node)
![Static Badge](https://img.shields.io/badge/%5E3.0.2-green?label=bcryptjs)
![Static Badge](https://img.shields.io/badge/%5E2.8.5-green?label=cors)
![Static Badge](https://img.shields.io/badge/%5E16.4.7-yellow?label=dotenv)
![Static Badge](https://img.shields.io/badge/%5E4.21.2-white?label=express)
![Static Badge](https://img.shields.io/badge/%5E9.0.2-white?label=jsonwebtoken)
![Static Badge](https://img.shields.io/badge/%5E8.12.1-limegreen?label=mongoose)
![Static Badge](https://img.shields.io/badge/%5E3.1.9-olivedrab?label=nodemon)

This is the backend API for the [Taskify](https://github.com/artyomagadzhanyan421/taskify.git) project, a task management application. The API allows users to create, read, update, and delete tasks while handling authentication.  

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

**1. Clone the repository**
```bash
git clone https://github.com/artyomagadzhanyan421/rest-api-taskify.git
cd rest-api-taskify
```

**2. Install dependencies**
```bash
npm install
```

**3. MongoDB Atlas (cloud database)**
- Create a free account at MongoDB Atlas
- Create a new cluster and database
- Add ```users``` and ```tasks``` collections in your database
- Get your connection string (formatted as ```mongodb+srv://<username>:<db_password>@<clustername>.gdbya.mongodb.net/<dbname>```).
- Replace ```<username>```, ```<password>```, ```<clustername>``` and ```<dbname>``` with your actual details
- Add this connection string as ```MONGO_URI``` and ```JWT_SECRET``` in your created ```.env``` file

```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

**4. Generate an App Password**
- Go to your Google Account settings
- Click on **Security** from the sidebar
- Enable **2-Step Verification** if it's not already enabled
- In your search tab select **App Passwords**
- Create a new app and copy your generated password
- Add new variales in your ```.env``` file

```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-generated-app-password
```

**5. Start your server**
```bash
npx nodemon index.js
```