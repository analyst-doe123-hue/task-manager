# 🚀 Task Manager App

A modern **Task Manager Web Application** built with **Next.js, Supabase, and Tailwind CSS**.
It allows users to **add, view, update, and delete tasks** in a clean and responsive interface.

## 🧩 Minimum Viable Product (MVP)

The **Task Manager App** is designed as a simple and functional MVP (Minimum Viable Product) that demonstrates the core features of a task management system.

### 🎯 Purpose

The goal of this project is to provide users with a lightweight tool to **organize daily tasks efficiently** while showcasing full-stack integration using modern web technologies.

### ⚙️ Core Functionality

The application allows users to:

* ➕ **Create Tasks**
  Users can add new tasks through an input field.

* 📋 **View Tasks**
  All tasks are fetched from the database and displayed in real time.

* ✔️ **Update Task Status**
  Tasks can be marked as completed or uncompleted by clicking on them.

* ❌ **Delete Tasks**
  Users can remove tasks they no longer need.

### 🔄 How It Works

* The frontend is built with **Next.js** and handles user interaction.
* The backend is powered by **Supabase**, which stores and manages task data.
* When a user performs an action (add, update, delete), the app:

  1. Sends a request to Supabase
  2. Updates the database
  3. Refreshes the UI to reflect the changes

### 🚀 Why This MVP Matters

This project demonstrates:

* Full CRUD operations (Create, Read, Update, Delete)
* Integration between frontend and backend
* Real-time data handling
* Responsive UI design

It serves as a foundation that can be expanded with features like:

* User authentication
* Task filtering and categories
* Deadlines and reminders
* Multi-user collaboration

---

---

## 🌐 Live Demo

🔗 **Vercel Deployment:**
👉 *[(https://task-manager-hvhuc2fay-analyst-vedels-projects.vercel.app/)]*

---

## 🎥 Demo Video

📺 **YouTube Walkthrough:**
👉 *[Paste your YouTube video link here]*

---

## 📂 GitHub Repository

💻 **Source Code:**
👉 *[(https://github.com/analyst-doe123-hue/task-manager)]*

---

## ✨ Features

* ✅ Add new tasks
* 📋 View all tasks
* ✔️ Mark tasks as complete
* ❌ Delete tasks
* ⚡ Real-time database (Supabase)
* 📱 Fully responsive UI (Tailwind CSS)

---

## 🛠️ Tech Stack

* **Frontend:** Next.js (App Router)
* **Backend / Database:** Supabase
* **Styling:** Tailwind CSS
* **Deployment:** Vercel

---

## ⚙️ Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/analyst-due-123hue/task-manager.git
cd task-manager
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Set up environment variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

---

### 4️⃣ Run the development server

```bash
npm run dev
```

Open 👉 http://localhost:3000

---

## 🗄️ Database Setup (Supabase)

Create a table named **tasks**:

```sql
create table tasks (
  id bigint generated always as identity primary key,
  text text not null,
  completed boolean default false,
  created_at timestamp default now()
);
```

⚠️ Disable **Row Level Security (RLS)** during development.

---

## 📁 Project Structure

```bash
task-manager/
│── app/
│   ├── page.tsx        # Home page
│   ├── tasks/          # Task manager page
│   └── layout.tsx      # Global layout
│
│── lib/
│   └── supabase.ts     # Supabase client
│
│── public/
│── styles/
│── .env.local
│── package.json
```

---

## 🚀 Deployment (Vercel)

1. Push your project to GitHub
2. Go to Vercel → Import Project
3. Add environment variables:

   * `NEXT_PUBLIC_SUPABASE_URL`
   * `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy 🎉

---

## 📚 Learn More

* Next.js Docs: https://nextjs.org/docs
* Supabase Docs: https://supabase.com/docs

---

## 👨‍💻 Author

**Gaylord Ndenga**
📧 *[Optional Email]*

---

## 📝 License

This project is open-source and available under the MIT License.
