
<!-- Hero Section -->
<p align="center">
  <img src="https://second-brainx.vercel.app/second-brain-preview.png" alt="Second Brain Cover" width="100%">
</p>

<h1 align="center">🧠 Second Brain</h1>
<p align="center">Your personal second brain for storing, organizing, and sharing content — anytime, anywhere.</p>

---

## 🚀 Overview
**Second Brain** is a full-stack productivity tool that helps you **capture, organize, and share** important content such as documents, links, tweets, and YouTube videos.  
It acts as your **personal knowledge hub**, with a clean UI and secure backend.

---

## ✨ Features
- 🔐 **Authentication** – Secure signup & login with JWT
- 📂 **Content Management** – Add, view, and delete content
- 🔖 **Tags & Categorization** – Keep content organized
- 🌐 **Content Sharing** – Generate a shareable link for your saved items
- 📱 **Responsive Design** – Works on mobile, tablet, and desktop
- ⚡ **Fast & Minimal UI** – Built with React & Tailwind

---

## 🛠 Tech Stack
### **Frontend**
- React.js
- Tailwind CSS
- Axios
- React Router

### **Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt
- Zod Validation

### **Deployment**
- Vercel (Frontend)
- Render (Backend)

---

## 🌍 Live Demo
🔗 **Deployed Link:** [https://second-brainx.vercel.app](https://second-brainx.vercel.app)

---

## 📂 Folder Structure

```bash
second-brain/
├─ backend/                                                                 # Express + MongoDB (TypeScript)
│ ├─ src/
│ │ ├─ config/                                                              # App configuration
│ │ ├─ controllers/                                                         # Route handlers (business logic)
│ │ ├─ middlewares/                                                         # Express middlewares
│ │ ├─ models/                                                              # Mongoose schemas/model
│ │ ├─ routes/                                                              # API route definitions
│ │ ├─ validations/                                                         # Zod validation schemas
│ │ └─ index.ts                                                             # Server entrypoint (mounts routes)
│ ├─ .env                                                                   # Backend env vars (local only)
│ ├─ .gitignore
│ ├─ package.json
│ ├─ package-lock.json
│ └─ tsconfig.json
│
├─ frontend/                                                                # React + Vite (TypeScript)
│ ├─ public/                                                                # Static assets (favicons, OG images)
│ ├─ src/
│ │ ├─ api/                                                                 # Axios wrappers / API clients
│ │ ├─ components/                                                          # Reusable UI components
│ │ ├─ context/                                                             # React contexts/providers
│ │ ├─ pages/                                                               # Route-level pages
│ │ ├─ App.tsx                                                              # App routes/layout
│ │ ├─ main.tsx                                                             # React DOM entry
│ │ ├─ index.css                                                            # Global styles
│ │ └─ vite-env.d.ts                                                        # Vite TS types
│ ├─ .env                                                                   # Frontend env vars (VITE_* only)
│ ├─ .gitignore
│ ├─ eslint.config.js
│ ├─ index.html
│ ├─ package.json
│ ├─ package-lock.json
│ ├─ tsconfig.app.json
│ ├─ tsconfig.node.json
│ ├─ vercel.json                                                           # Frontend deployment config
│ └─ vite.config.ts
│
├─ LICENSE
└─ README.md
   ```
---

## ⚙ Installation & Setup

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/sanjitxdutta/second-brain.git
cd second-brain
```

### **2️⃣ Backend Setup**
```bash
cd backend
npm install
```
Create a .env file in backend/:
```bash
PORT=5000
MONGODB_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
```
Run backend:
```bash
npm run dev
```

### **3️⃣ Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

---

## ⚙ Installation & Setup

### **User Routes (/api/user)*
| Method | Endpoint  | Description          | Auth |
| ------ | --------- | -------------------- | ---- |
| POST   | `/signup` | Register a new user  | ❌  |
| POST   | `/signin` | Log in existing user | ❌  |

**Signup Request:**
```json
POST /api/user/signup
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

**Signup Response:**
```json
{
  "success": true,
  "token": "jwt_token_here"
}
```

**Signin Request:**
```json
POST /api/user/signin
{
  "email": "john@example.com",
  "password": "secret123"
}
```

**Signin Response:**
```json
{
  "success": true,
  "token": "jwt_token_here"
}
```

### **Content Routes (/api/content)**
| Method | Endpoint | Description      | Auth |
| ------ | -------- | ---------------- | ---- |
| POST   | `/add`      | Add new content  | ✅    |
| GET    | `/`      | Get user content | ✅    |
| POST | `/delete`      | Delete content   | ✅    |

**Add Content Request:**
```json
POST /api/content
Authorization: Bearer jwt_token
{
  "type": "document",
  "title": "My Doc",
  "link": "https://example.com",
  "tags": "notes, work"
}
```

**Get Content Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "12345",
      "type": "document",
      "title": "My Doc",
      "link": "https://example.com",
      "tags": "notes, work",
      "createdAt": "2025-08-14T10:00:00Z"
    }
  ]
}
```

**Delete Content Request:**
```json
POST /api/content/delete
Authorization: Bearer jwt_token
{
  "id": "12345"
}
```

**Delete Content Response:**
```json
{
  "success": true,
  "message": "Content deleted"
}
```

### **Share Routes (/api/share)**
| Method | Endpoint      | Description           | Auth |
| ------ | ------------- | --------------------- | ---- |
| POST   | `/`           | Toggle sharing status | ✅    |
| GET    | `/:shareLink` | Get shared content    | ❌    |

**Toggle Share Request:**
```json
POST /api/share
Authorization: Bearer jwt_token
{
  "share": true
}
```

**Toggle Share Response:**
```json
{
  "success": true,
  "link": "https://yourdomain.com/api/share/abc123"
}
```

---

## 🤝 Contributing
1. Fork this repository
2. Create a new branch (feature/new-feature)
3. Commit your changes
4. Push to your branch
5. Create a Pull Request

---

## 🤝 Contributing
This project is licensed under the MIT License.
