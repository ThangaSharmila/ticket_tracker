
# Ticket Management App

A full-stack application to manage tickets using **Node.js + Express + MongoDB** for the backend and **React** for the frontend.

---

## 📌 Features
- **Backend (REST API)**:
  - Create a ticket with fields:
    - `title` (string)
    - `desc` (string)
    - `priority` (low / medium / high)
    - `status` (open / in-progress)
  - Endpoints:
    - `POST /api/tickets` → Add a ticket
    - `GET /api/tickets` → Get all tickets (supports filters by `status` and `priority`)
    - `PUT /api/tickets/:id` → Update ticket status
    - `DELETE /api/tickets/:id` → Delete a ticket

- **Frontend (React)**:
  - Display all tickets
  - Filter tickets by `status` and `priority`
  - Inline status update using a dropdown
  - Basic UI with plain CSS (no Redux)

---

## 🛠 Tech Stack
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Frontend**: React, Plain CSS
- **Database**: MongoDB (Local or Atlas)

---

## ✅ Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- MongoDB (or use MongoDB Atlas)
- [Git](https://git-scmct Structure
