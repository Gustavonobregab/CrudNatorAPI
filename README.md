CrudNator - Backend API

CrudNator is a social platform for programmers built to connect developers seeking collaboration on projects. This is the backend of the platform, developed with Node.js, Express, and TypeScript. It handles user authentication, data security, and provides endpoints for interacting with platform data.
Technologies Used

Node.js: JavaScript runtime for executing code on the server.
Express: Web framework for Node.js, used to build fast and scalable APIs.
TypeScript: A superset of JavaScript that adds static typing, improving code maintainability and scalability.
JWT (JSON Web Tokens): Used for secure user authentication and authorization.
Bcrypt.js: Library for hashing passwords to ensure secure storage.
MongoDB: NoSQL database used to store user and project data.
Mongoose: ODM library for MongoDB, simplifying interaction with the database.
Features

User Authentication: Login and registration system with password hashing and token-based authentication (JWT).
Project Management: Create, edit, view, and delete frontend and backend projects securely.
Collaborator Search: Allows users to search for developers with complementary skills for collaboration.
Data Protection: All data is stored securely, with hashed passwords and token-based authentication for data integrity.
