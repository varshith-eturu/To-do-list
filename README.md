# 📝 To-Do List Application

A full-stack MERN-based (MongoDB, Express.js, React, Node.js) To-Do List web application that allows users to register, log in, and manage daily tasks with priorities, deadlines, filters, and sorting. Secure, responsive, and designed for productivity.

---

## 🚀 Features

- 🔐 User Authentication (JWT-based Login/Register)
- 🧾 Add, Edit, Delete, and Mark Tasks as Done
- ⏰ Deadlines with Date Picker
- 📊 Filter tasks by:
  - Priority (High/Medium/Low)
  - Status (Completed/Incomplete)
  - Sorting (Earliest or Latest First)
- 📦 Full CRUD via RESTful APIs
- 🎯 Protected Routes (Dashboard access after login)
- 💾 MongoDB Integration

---

## 🛠️ Technologies Used

### Frontend:
- React.js
- Axios
- React Router DOM
- CSS / Custom Styling

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- bcrypt for password hashing
- dotenv for config management


🧪 Setup Instructions
🔧 Prerequisites
Node.js installed

MongoDB installed or using MongoDB Atlas

Git installed


🔐 Authentication Flow
On successful registration or login, JWT token is stored in localStorage.

All protected API routes require Authorization: Bearer <token> in headers.

On logout, the token is cleared and user is redirected.

🧾 Sample User Flow
User Registers ➝ Login ➝ Dashboard

Add Tasks with Deadline, Priority

Edit / Delete / Mark Tasks as Done

Filter tasks (Completed / Priority / Date)

Logout (Token is cleared)

📌 Future Improvements
Task Category / Tagging System

Notification reminders

Dark Mode toggle

Export tasks as CSV/PDF

🧑‍💻 Author
Varshith Eturu
GitHub Profile


## 📂 Project Structure

```bash
todoList/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── server.js
│   └── .env
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── utils/
    │   └── App.js
    └── package.json


-----

