## Welcome to TechDynasty-Modern technology at your fingertip - Server.

## Overview

This is the back-end for the e-commerce platform built with Node.js, Express.js, and MongoDB. It handles user authentication, product management, and CRUD operations for the application.

## Features

- **User Authentication:** Secure authentication using Firebase Auth.
- **Product Management:** CRUD operations for managing products.
- **API Endpoints:** RESTful API for client-server communication.
- **Data Validation:** Ensures data integrity and security.

## Technologies Used

- **Node.js:** JavaScript runtime for building the server.
- **Express.js:** Web framework for Node.js.
- **MongoDB:** NoSQL database for storing data.
- **Mongoose:** ODM for MongoDB, providing schema validation.
- **Firebase Admin SDK:** For user authentication.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ifshad/tech-dynasty-server
   cd tech-dynasty-server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   `env
    PORT=5000
    DB_USERNAME=your_db_username
    DB_PASSWORD=your_db_password
    `

4. Start the server:

   ```bash
   npm start
   ```

5. The server will run on `http://localhost:5000`.

## API Endpoints

- **Users:**
  - `GET /users`: Get all users.
  - `POST /users`: Create new user.
- **Products:**
  - `GET /products`: Get all products.
  - `POST /products`: Add a new product.
  - `PUT /products/:id`: Update a product.
  - `DELETE /products/:id`: Delete a product.

## Usage

- **Add Products:** Use the API endpoints to add or manage products.
- **User Management:** Authenticate users using Firebase Auth.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
