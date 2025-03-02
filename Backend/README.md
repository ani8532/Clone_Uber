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

## Endpoint: `/captains/register`

### Description
This endpoint registers a new captain with their vehicle details.

### Method: `POST`

### Request Body (JSON)
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Smith"
  },
  "email": "john.smith@example.com",
  "password": "SecurePass123",
  "vehicle": {
    "color": "Black",
    "plate": "MH02AB1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Request Validation
- `fullname.firstname`: Required, at least 2 characters long
- `fullname.lastname`: Optional, at least 2 characters long if provided
- `email`: Required, must be a valid email format
- `password`: Required, at least 6 characters long
- `vehicle.color`: Required, at least 3 characters long
- `vehicle.plate`: Required, at least 3 characters long
- `vehicle.capacity`: Required, must be an integer greater than 0
- `vehicle.vehicleType`: Required, must be one of: "car", "bike", "auto"

### Responses
#### Success Response
- **Status Code**: `201 Created`
- **Response Body**:
  ```json
  {
    "token": "<JWT_TOKEN>",
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
- **400 Bad Request**: If email already exists
  ```json
  {
    "message": "Captain Already exists"
  }
  ```
- **500 Internal Server Error**: If an unexpected server error occurs
  ```json
  {
    "error": "Internal Server Error"
  }
  ```

### Notes
- The captain status is set to "inactive" by default
- Location coordinates are initially set to null
- The password is stored securely using bcrypt hashing
- A JWT token is returned upon successful registration
- The socketId field is used for real-time tracking