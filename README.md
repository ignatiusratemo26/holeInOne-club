# HoleInOne Project

This project is a web application for managing and showcasing the services and facilities of the "Hole in One" golf resort. The application is divided into two parts:
1. **Backend**: Located in the `holeInOne_backend` folder.
2. **Frontend**: Located in the `frontend` folder.

---

## Prerequisites
Before running the project, ensure you have the following installed on your system:
- [Go (Golang)](https://golang.org/) (version 1.18 or later)
- [Node.js](https://nodejs.org/) (version 14 or later) and npm (Node Package Manager)
- [MongoDB](https://www.mongodb.com/) (either installed locally or hosted on a cloud platform)

---

## Setup Instructions

### 1. Backend (holeInOne_backend)

1. **Navigate to the Backend Directory**
   ```bash
   cd holeInOne_backend
   ```

2. **Install Required Packages**
   Use the `go mod download` command to download all the required Go packages:
   ```bash
   go mod download
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the `holeInOne_backend` directory with the following content (replace placeholders with your MongoDB details):
   ```plaintext
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
   DB_NAME=holeInOneDB
   COLLECTION_NAME=<collection_name> 
   PORT=8080
   ```

4. **Run the Backend**
   Start the backend server with the following command:
   ```bash
   go run main.go
   ```

   The backend should now be running on `http://localhost:8080` (or the port specified in your `.env` file).

---

### 2. Frontend (frontend)

1. **Navigate to the Frontend Directory**
   ```bash
   cd frontend
   ```

2. **Install Dependencies**
   Use the `npm install` command to download all necessary Node.js dependencies:
   ```bash
   npm install
   ```

3. **Run the Frontend**
   Start the frontend development server:
   ```bash
   npm start
   ```

   By default, the frontend will run on `http://localhost:3000`.

---

## Connecting to MongoDB

The backend connects to a MongoDB database specified in the `.env` file. Ensure your MongoDB database is accessible and properly configured:
- If using a local MongoDB instance, replace the `MONGO_URI` value with `mongodb://localhost:27017`.
- If using MongoDB Atlas (cloud-hosted), use the connection string provided by Atlas in the `MONGO_URI`.

Verify that the database (`DB_NAME`) and collection (`COLLECTION_NAME`) exist and have the necessary data for the project.

---

## Project Workflow

1. Start the backend server:
   ```bash
   cd holeInOne_backend
   go mod download
   go run main.go
   ```

2. Start the frontend server:
   ```bash
   cd frontend
   npm start
   ```

3. Open your browser and visit `http://localhost:3000` to access the application.

---

## Troubleshooting

### Backend Issues
- Ensure the `.env` file is correctly configured and the MongoDB server is running.
- Verify that all Go modules are downloaded using `go mod tidy`.

### Frontend Issues
- Ensure all Node.js dependencies are installed (`npm install`).
- Verify that the backend server is running and accessible at the configured API endpoint.

---

## Directory Structure

```plaintext
holeInOne_project/
├── holeInOne_backend/       # Backend code (Go)
├── frontend/                # Frontend code (React.js)
└── README.md                # This file
```

---

## Author
Developed by Baldeep.
```