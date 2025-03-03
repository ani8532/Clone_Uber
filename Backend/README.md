# User API Documentation

## Endpoint: `/users/register`

### Description
This endpoint is used to register a new user. It accepts user details and creates a new account after validating the input data.

### Method: `POST`

### Request Body (JSON)
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "SecurePass123"
}
```

### Request Validation
- `fullname.firstname`: Required, at least 2 characters long.
- `fullname.lastname`: Optional, at least 2 characters long if provided.
- `email`: Required, must be a valid email format.
- `password`: Required, at least 6 characters long.

### Responses
#### Success Response
- **Status Code**: `201 Created`
- **Response Body**:
  ```json
  {
    "token": "<JWT_TOKEN>",
    "user": {
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "johndoe@example.com"
    }
  }
  ```

#### Error Responses
- **400 Bad Request**: If validation fails
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      }
    ]
  }
  ```
- **500 Internal Server Error**: If an unexpected server error occurs
  ```json
  {
    "error": "Internal Server Error"
  }
  ```

### Endpoint: `/users/login`

### Description
This endpoint is used to authenticate a user and return a JWT token if successful.

### Method: `POST`

### Request Body (JSON)
```json
{
  "email": "johndoe@example.com",
  "password": "SecurePass123"
}
```

### Request Validation
- `email`: Required, must be a valid email format.
- `password`: Required, at least 6 characters long.

### Responses
#### Success Response
- **Status Code**: `200 OK`
- **Response Body**:
  ```json
  {
    "token": "<JWT_TOKEN>",
    "user": {
      "email": "johndoe@example.com"
    }
  }
  ```

#### Error Responses
- **400 Bad Request**: If validation fails
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      }
    ]
  }
  ```
- **401 Unauthorized**: If login credentials are incorrect
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Credentials"
      }
    ]
  }
  ```
- **500 Internal Server Error**: If an unexpected server error occurs
  ```json
  {
    "error": "Internal Server Error"
  }
  ```
  ...existing code...

### Endpoint: `/users/profile`

### Description
This endpoint retrieves the profile information of the currently authenticated user.

### Method: `GET`

### Authentication
Requires a valid JWT token in the Authorization header or cookie.

### Responses
#### Success Response
- **Status Code**: `200 OK`
- **Response Body**:
  ```json
  {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com"
  }
  ```

#### Error Responses
- **401 Unauthorized**: If no valid token is provided
  ```json
  {
    "error": "Unauthorized access"
  }
  ```
- **500 Internal Server Error**: If an unexpected server error occurs

### Endpoint: `/users/logout`

### Description
This endpoint logs out the current user by invalidating their JWT token.

### Method: `GET`

### Authentication
Requires a valid JWT token in the Authorization header or cookie.

### Responses
#### Success Response
- **Status Code**: `200 OK`
- **Response Body**:
  ```json
  {
    "msg": "Logged out successfully"
  }
  ```

#### Error Responses
- **401 Unauthorized**: If no valid token is provided
  ```json
  {
    "error": "Unauthorized access"
  }
  ```
- **500 Internal Server Error**: If an unexpected server error occurs

### Notes
- The logout endpoint blacklists the current token
- Blacklisted tokens expire after 24 hours
- After logout, the token cookie is cleared
- The password is stored securely using hashing.
- A JWT token is returned upon successful login.
- Ensure the request follows the defined structure to avoid validation errors.

# Captain API Documentation

## Endpoints Overview
- POST `/captains/register` - Register a new captain
- POST `/captains/login` - Authenticate captain
- GET `/captains/profile` - Get captain's profile
- GET `/captains/logout` - Logout captain

## Endpoint: `/captains/register`

### Method: `POST`

### Request Body
```json
{
  "fullname": {
    "firstname": "John",       // Required, min 2 chars
    "lastname": "Smith"        // Optional, min 2 chars if provided
  },
  "email": "john.smith@example.com",    // Required, valid email format
  "password": "SecurePass123",          // Required, min 6 chars
  "vehicle": {
    "color": "Black",         // Required, min 3 chars
    "plate": "MH02AB1234",    // Required, min 3 chars
    "capacity": 4,            // Required, positive integer
    "vehicleType": "car"      // Required, enum: "car", "bike", "auto"
  }
}
```

### Success Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",   // JWT token for authentication
  "captain": {
    "fullname": {
      "firstname": "John",
      "lastname": "Smith"
    },
    "email": "john.smith@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "MH02AB1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive",     // Default status
    "socketId": null,         // Used for real-time tracking
    "location": {
      "lat": null,           // Updated during active rides
      "lng": null
    }
  }
}
```

## Endpoint: `/captains/login`

### Method: `POST`

### Request Body
```json
{
  "email": "john.smith@example.com",    // Required, valid email
  "password": "SecurePass123"           // Required, min 6 chars
}
```

### Success Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "captain": {
    "fullname": {
      "firstname": "John",
      "lastname": "Smith"
    },
    "email": "john.smith@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "MH02AB1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive"
  }
}
```

## Endpoint: `/captains/profile`

### Method: `GET`
### Authentication: Required (JWT Token)

### Success Response
```json
{
  "captain": {
    "fullname": {
      "firstname": "John",
      "lastname": "Smith"
    },
    "email": "john.smith@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "MH02AB1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive",
    "location": {
      "lat": null,
      "lng": null
    }
  }
}
```

## Endpoint: `/captains/logout`

### Method: `GET`
### Authentication: Required (JWT Token)

### Success Response
```json
{
  "message": "Logout Sucessfully"
}
```

### Common Error Responses
```json
{
  "errors": [
    {
      "msg": "Invalid Email",           // Validation error
      "param": "email",
      "location": "body"
    }
  ]
}
```

```json
{
  "message": "Captain Already exist"    // Registration with existing email
}
```

```json
{
  "error": "Unauthorized access"        // Invalid or missing token
}
```

### Notes
- All endpoints except register/login require JWT authentication
- Token is provided in Authorization header or cookie
- Password is hashed using bcrypt before storage
- Socket ID is used for real-time location tracking
- Vehicle type must be one of: "car", "bike", "auto"
- Captain status can be "active" or "inactive"