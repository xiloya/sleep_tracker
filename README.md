# Sleep Tracker App

A simple Angular + Express.js fullstack app where users can save their sleep data daily.

**Main goal**: Practice using Docker, GitHub Actions, and EC2 deployment.

---

## Features

- User registration & login (JWT auth)
- Create & view daily sleep entries
- MongoDB for storage
- Swagger API docs at `/api-docs`

---

## Tech Stack

- **Frontend**: Angular, Angular Material
- **Backend**: Node.js, Express.js, MongoDB
- **DevOps**: Docker, AWS EC2, GitHub Actions

---

## Run the App Locally

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
ng serve
```

---

## API Endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile/:id`
- `GET /api/auth/users`

### Sleep Data

- `POST /api/sleepdata/`
- `GET /api/sleepdata/:userId`

---

## 📄 Notes

This app is not production-ready. It's just for practice with fullstack and DevOps basics.
