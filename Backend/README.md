# User Registration API

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

### Example Response
#### Successful Registration
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com"
  }
}
```

### Notes
- The password is stored securely using hashing.
- A JWT token is returned upon successful registration.
- Ensure the request follows the defined structure to avoid validation errors.

