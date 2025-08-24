# Restaurant Management System - Full-Stack Web App

This project is a modern, full-stack web application designed to manage restaurant operations. It provides a comprehensive solution for both restaurant staff and customers, built on the **MEAN stack** (MongoDB, Express, Angular, Node.js) to ensure a responsive and scalable architecture.

---

## 1. Tech Stack

### Frontend
-   **Angular**: A powerful framework for building dynamic single-page applications.
-   **TypeScript**: A typed superset of JavaScript, enhancing code quality and maintainability.
-   **SCSS**: A CSS preprocessor for modular and efficient styling.
-   **Nx**: A monorepo tool that provides a scalable and organized project structure.

### Backend
-   **Node.js**: The server-side JavaScript runtime.
-   **Express.js**: A minimalist web framework for building the RESTful API.
-   **MongoDB**: A flexible NoSQL database for managing data.

### Tools & Libraries
-   **JWT (JSON Web Tokens)**: For secure and stateless authentication.
-   **Git**: For version control.
-   **Jest & Cypress**: For comprehensive testing.

---

## 2. Key Features

-   **User & Product Management**: Complete CRUD (Create, Read, Update, Delete) operations.
-   **Billing System & Dashboard**: A robust system for handling transactions and viewing analytics.
-   **JWT Authentication**: Secure user login and protected routes.
-   **Role-based Access**: Differentiates between admin and customer access.
-   **Responsive Admin Interface**: A dashboard that adapts to different screen sizes.

---

## 3. Technical Highlights

-   **RESTful APIs**: Developed a set of APIs with Express.js for seamless communication.
-   **Modular Design**: Created a scalable architecture using Nx for modular components.
-   **Database Design**: Implemented an efficient MongoDB schema.
-   **Comprehensive Testing**: Ensured reliability with Jest for unit testing and Cypress for end-to-end testing.

---

## 4. Installation & Setup

To get this project running on your local machine, follow these steps.

### Prerequisites
-   Node.js (LTS recommended) & npm
-   Angular CLI (`npm install -g @angular/cli`)
-   A MongoDB database (local or cloud-hosted)

### Backend Setup
1.  Navigate to the `backend` folder.
    ```bash
    cd backend
    ```
2.  Install dependencies.
    ```bash
    npm install
    ```
3.  Create a `.env` file and add your database URL and JWT secret.
    ```
    PORT=3000
    DATABASE_URL='YOUR_MONGODB_CONNECTION_STRING'
    JWT_SECRET='A_STRONG_RANDOM_SECRET_KEY'
    ```
4.  Start the server.
    ```bash
    npm start
    ```

### Frontend Setup
1.  Open a **new terminal** and navigate to the `frontend` folder.
    ```bash
    cd frontend
    ```
2.  Install dependencies.
    ```bash
    npm install
    ```
3.  Start the Angular app.
    ```bash
    ng serve admin-panel
    ```

---

## 5. License

This project is licensed under the MIT License.