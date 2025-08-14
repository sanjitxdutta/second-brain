
<!-- Hero Section -->

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

<img width="1364" height="628" alt="Screenshot 2025-08-14 205142" src="https://github.com/user-attachments/assets/c0c9a730-7bb2-48f2-9af3-ae1de02fc660" />
<img width="1899" height="865" alt="Screenshot 2025-08-14 211142" src="https://github.com/user-attachments/assets/1e7e23a1-cb14-4ee2-b70d-acdf482d28be" />
<img width="1899" height="862" alt="Screenshot 2025-08-14 211206" src="https://github.com/user-attachments/assets/200f30eb-69c6-41e6-8911-edc394b418aa" />
<img width="1898" height="861" alt="Screenshot 2025-08-14 211238" src="https://github.com/user-attachments/assets/ff672128-557b-45eb-b466-e417e2dbd2bc" />

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
