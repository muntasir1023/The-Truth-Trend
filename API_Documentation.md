# API Documentation

## Base URL
`http://localhost:5000`

## Endpoints

### User Registration
- **POST** `/api/register`
- **Request Body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response**:
  - 201 Created: User registered successfully.
  - 400 Bad Request: Error in registration.

### User Login
- **POST** `/api/login`
- **Request Body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response**:
  - 200 OK: Login successful.
  - 404 Not Found: User not found.
  - 400 Bad Request: Invalid credentials.

### Get All Items
- **GET** `/items`
- **Response**:
  - 200 OK: Returns a list of items.

### Create a New Item
- **POST** `/items`
- **Request Body**:
  ```json
  {
    "name": "string",
    "description": "string"
  }
  ```
- **Response**:
  - 201 Created: Item created successfully.
  - 400 Bad Request: Error in item creation.

### Get Item by ID
- **GET** `/items/{id}`
- **Response**:
  - 200 OK: Returns the item.
  - 404 Not Found: Item not found.

### Update Item by ID
- **PUT** `/items/{id}`
- **Request Body**:
  ```json
  {
    "name": "string",
    "description": "string"
  }
  ```
- **Response**:
  - 200 OK: Item updated successfully.
  - 404 Not Found: Item not found.
  - 400 Bad Request: Error in updating item.

### Delete Item by ID
- **DELETE** `/items/{id}`
- **Response**:
  - 200 OK: Item deleted successfully.
  - 404 Not Found: Item not found.

### Get Events
- **GET** `/api/events`
- **Response**:
  - 200 OK: Returns a list of events.

### Create Event
- **POST** `/api/events`
- **Request Body**:
  ```json
  {
    "title": "string",
    "date": "string"
  }
  ```
- **Response**:
  - 201 Created: Event created successfully.

### Contact Form Submission
- **POST** `/api/contact`
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "subject": "string",
    "message": "string"
  }
  ```
- **Response**:
  - 200 OK: Message received successfully.
