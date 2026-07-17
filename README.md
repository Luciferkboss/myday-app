# 📅 Daily Routine Tracker — MERN Stack

A full-stack web app to track your daily habits, tasks and routines — built with **MongoDB, Express, React, Node.js**.

---

## 🚀 Features

- 🔐 **User Auth** — Register & Login with JWT
- ✅ **CRUD Tasks** — Add, edit, delete, mark complete
- 📅 **Day Navigation** — Browse any day's tasks with prev/next arrows
- 📊 **Progress Stats** — Live daily completion progress bar
- 🏷️ **Categories** — Health, Work, Personal, Study, Fitness, Other
- ⚡ **Priority Levels** — High, Medium, Low with color badges
- ⏰ **Time Slots** — Optional time for each task
- 🔍 **Filtering** — Filter by status or category
- 📱 **Responsive** — Works great on mobile

---

## 🗂️ Project Structure

```
daily-routine-app/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── tasks.js
│   ├── middleware/
│   │   └── auth.js
│   ├── config.env        ← environment variables
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── axios.js
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── TaskCard.jsx
    │   │   ├── TaskModal.jsx
    │   │   ├── StatsBar.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── context/
    │   │   ├── AuthContext.jsx
    │   │   └── TaskContext.jsx
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   ├── Login.jsx
    │   │   └── Register.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    └── package.json
```

---

## ⚙️ Setup & Run

### Prerequisites
- Node.js ≥ 18
- MongoDB running locally (`mongod`) OR a MongoDB Atlas URI

### 1. Backend

```bash
cd daily-routine-app/backend
npm install
# Edit config.env if needed (MONGO_URI, JWT_SECRET, PORT)
npm run dev
# Server runs on http://localhost:5000
```

### 2. Frontend

```bash
cd daily-routine-app/frontend
npm install
npm run dev
# App runs on http://localhost:5173
```

### 3. Open the App

Go to **http://localhost:5173** in your browser.
Register an account and start adding your daily tasks!

---

## 🛠️ API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |
| GET | `/api/tasks?date=YYYY-MM-DD` | Get tasks by date |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update a task |
| PATCH | `/api/tasks/:id/toggle` | Toggle complete |
| DELETE | `/api/tasks/:id` | Delete a task |

---

## 🔑 Environment Variables (`config.env`)

```env
MONGO_URI=mongodb://localhost:27017/daily_routine
JWT_SECRET=your_secret_key_here
PORT=5000
```
