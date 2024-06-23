# Task Management Application

This is a simple Task Management Application that allows users to create, read, update, and delete tasks. The application is built using HTML, CSS, and JavaScript for the frontend and Node.js, Express.js, and SQL (SQLite) for the backend.

## Features

- View a list of tasks.
- Add new tasks with a title, description, and due date.
- Edit existing tasks.
- Delete tasks.
- Responsive design for usability on both desktop and mobile devices.

## Tech Stack

### Frontend

- HTML
- CSS
- JavaScript

### Backend

- Node.js
- Express.js
- SQL (SQLite)

## Setup Instructions

### Prerequisites

- Node.js installed on your machine.
- SQLite installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/task-management-app.git
   cd task-management-app

#Navigate to the backend directory and install dependencies:
cd backend
npm install

#Create the SQLite database:
node createDatabase.js

#Running the Application
-Backend
node server.js
The server will start on http://localhost:5000.

-Frontend
npm install -g http-server
http-server
The server will start on http://localhost:8080.

-Open your web browser and go to http://localhost:8080 to view the application.

#API Endpoints
-GET /api/tasks: Retrieve all tasks.
-POST /api/tasks: Create a new task.
-GET /api/tasks/:id: Retrieve a single task by its ID.
-PUT /api/tasks/:id: Update an existing task.
-DELETE /api/tasks/:id: Delete a task.

#Future Improvements
-Add user authentication to allow multiple users to manage their tasks.
-Implement filtering and searching functionality for tasks.
-Enhance the UI with more animations and interactive elements.
