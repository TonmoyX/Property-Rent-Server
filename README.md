# PropRent Server

A RESTful API backend server for the PropRent property rental application. Built with Node.js, Express.js, and MongoDB.

## Project Overview

PropRent Server is a robust backend application that manages property listings, user bookings, and user role management. It provides endpoints for CRUD operations on properties, booking management, and user administration.

## Features

- **Property Management**: Create, read, update, and delete property listings
- **User Booking System**: Manage property bookings with user authentication
- **User Role Management**: Update and retrieve user roles
- **JWT Authentication**: Secure endpoints with JWT token verification
- **MongoDB Integration**: Persistent data storage with MongoDB Atlas
- **CORS Support**: Cross-origin resource sharing enabled for frontend integration

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js (v5.2.1)
- **Database**: MongoDB (v7.3.0)
- **Authentication**: JWT with jose-cjs (v6.2.3)
- **Environment**: dotenv (v17.4.2)
- **Development**: Nodemon (v3.1.14)

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account or local MongoDB instance
- Git

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PropRent-server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=8000
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?appName=<app-name>
   ```

4. **Start the server**
   ```bash
   npm start
   ```

   For development with auto-reload:
   ```bash
   npm run dev
   ```

## API Endpoints

### User Management

- **GET** `/getUsers`
  - Retrieve all users
  - Response: Array of user objects

- **PATCH** `/updateUserRole/:id`
  - Update user role by ID
  - Body: `{ role: "admin" | "user" }`
  - Response: Update confirmation

### Property Management

- **POST** `/addProperties`
  - Add a new property listing
  - Body: Property object with details (name, location, price, etc.)
  - Response: Created property object with ID

- **GET** `/getPropertiesData`
  - Retrieve all properties
  - Response: Array of property objects

- **GET** `/getPropertiesData/:id`
  - Retrieve a specific property by ID
  - Response: Single property object

- **PATCH** `/getPropertiesData/:id`
  - Update property details by ID
  - Body: Updated property fields
  - Response: Update confirmation

- **DELETE** `/getPropertiesData/:id`
  - Delete a property by ID
  - Response: Deletion confirmation

### Booking Management

- **POST** `/addBookings` ⚠️ (Protected - Requires JWT Token)
  - Create a new booking
  - Headers: `Authorization: Bearer <token>`
  - Body: Booking object
  - Response: Created booking object with ID

- **GET** `/addBookings`
  - Retrieve all bookings
  - Response: Array of booking objects

- **PATCH** `/addBookings/:id`
  - Retrieve a specific booking by ID
  - Response: Single booking object

## Database Schema

### PropRentServer Database

#### OwnerPropertiesData Collection
- Property listings with details like name, location, price, images, etc.

#### UserBookingsData Collection
- User booking records with property references and booking details

### PropRentClient Database

#### User Collection
- User information including name, email, role, profile data

## Authentication

The server uses JWT (JSON Web Tokens) for securing booking endpoints. 

### How to Use Protected Endpoints

1. Obtain a JWT token from the authentication service
2. Include the token in the request header:
   ```
   Authorization: Bearer <your-jwt-token>
   ```
3. The server verifies the token before allowing access to protected endpoints

### Token Verification

- Tokens are verified against a JWKS (JSON Web Key Set) endpoint
- Invalid or missing tokens return a 401 Unauthorized or 403 Forbidden response

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port number | `8000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |

## Running the Server

### Development Mode
```bash
npm run dev
```
The server will run with auto-reload enabled using Nodemon.

### Production Mode
```bash
npm start
```

## Project Structure

```
PropRent-server/
├── index.js           # Main server file with all routes
├── package.json       # Dependencies and scripts
├── .env              # Environment variables
├── .gitignore        # Git ignore rules
└── README.md         # This file
```

## Error Handling

The server returns appropriate HTTP status codes:

- **200 OK**: Successful request
- **401 Unauthorized**: Missing or invalid authentication token
- **403 Forbidden**: Token verification failed
- **400 Bad Request**: Invalid request data
- **500 Internal Server Error**: Server error

## CORS Configuration

CORS is enabled for all routes, allowing requests from different origins. This is configured in the middleware setup.

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^5.2.1 | Web framework |
| mongodb | ^7.3.0 | Database driver |
| cors | ^2.8.6 | Cross-origin requests |
| dotenv | ^17.4.2 | Environment variables |
| jose-cjs | ^6.2.3 | JWT operations |
| nodemon | ^3.1.14 | Development auto-reload |

## Common Issues & Solutions

### MongoDB Connection Error
- Ensure your IP is whitelisted in MongoDB Atlas
- Verify the connection string in `.env` is correct
- Check your internet connection

### Port Already in Use
- Change the PORT in `.env` file
- Or kill the process using the current port

### JWT Token Errors
- Ensure the token is valid and not expired
- Check the JWKS endpoint is accessible
- Include the token in the correct header format

## Future Enhancements

- Add request validation middleware
- Implement pagination for listing endpoints
- Add logging system
- Create separate route files
- Add unit and integration tests
- Implement rate limiting
- Add email notifications

## Contributing

1. Create a feature branch
2. Make your changes
3. Commit with clear messages
4. Push to the repository
5. Create a pull request

## License

This project is part of Programming Hero Assignment-10.

## Support

For issues or questions, please contact the development team or create an issue in the repository.

## API Base URL

```
http://localhost:8000
```

---

**Last Updated**: June 2026  
**Status**: Active Development
