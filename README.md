# 📝 Blog API Project

<div align="center">

A comprehensive full-stack project built to master **Node.js** and **RESTful API** architecture.
It consists of a robust backend server serving two distinct React front-end applications: a public blog and a private admin dashboard.

[**🔴 User Blog Demo**](https://cv-maker-99hc.vercel.app/) | [**🔵 Admin Dashboard Demo**](https://blog-api-seven-blue.vercel.app/)

<img src="https://github.com/user-attachments/assets/6c6133b9-fa93-47f1-bd60-a9da3cec8fad" alt="Project Screenshot" width="800" />

</div>

---

## 🏗️ Architecture

This project is a monorepo containing three main modules:
1.  **API Server:** The central backend handling data, authentication, and business logic.
2.  **User Blog:** A public-facing site for reading posts and leaving comments.
3.  **Admin Dashboard:** A CMS (Content Management System) for managing posts, comments, and users.



---

## 🛠️ Tech Stack

**Backend**
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

**Frontend**
![React](https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

---

## 🔌 API Server

**📂 Location:** [`/backend`](https://github.com/idontfeelsogood1/blog-api/tree/main/backend)

The core of the project. The endpoints follow strict RESTful principles (e.g., `GET /posts/:postId/comments/`) and return standardized JSON responses.

### Key Features & Learnings:
* **Authentication (JWT):** Implemented stateless authentication using **Passport.js** and **JSON Web Tokens**. Upon login, the server issues a token which the client stores and attaches to headers for protected routes (create/edit/delete).
* **Database (Prisma ORM):** Utilized **Prisma** with **PostgreSQL** to define complex schemas and manage one-to-many relationships (e.g., Users → Posts → Comments).
* **Validation:** Integrated `express-validator` to sanitize and validate incoming request bodies.

**Libraries:** `bcryptjs`, `cors`, `express-validator`, `jsonwebtoken`, `passport-jwt`, `passport-local`.

---

## 📖 User Blog (Public Client)

**📂 Location:** [`/userBlog`](https://github.com/idontfeelsogood1/blog-api/tree/main/userBlog)
**🚀 Live Demo:** [View Site](https://cv-maker-99hc.vercel.app/)

The public-facing interface where visitors can read content. Built with **React** to practice consuming APIs via custom hooks.

### Features:
* **Read-Only View:** Browse all published blog posts.
* **Comment System:** Users can register/login to leave comments on posts.
* **Custom Hooks:** Implemented `useFetch` for data retrieval and `useMutation` for posting data.

---

## 🛡️ Admin Dashboard (CMS)

**📂 Location:** [`/privateBlog`](https://github.com/idontfeelsogood1/blog-api/tree/main/privateBlog)
**🚀 Live Demo:** [View Dashboard](https://blog-api-seven-blue.vercel.app/)

A protected Single Page Application (SPA) designed for administrators to manage the blog's content. Access is restricted to admin accounts only.

### Features:
* **Content Management:** Create, Edit, and Delete blog posts.
* **Publishing Workflow:** Toggle posts between "Draft" and "Published" states.
* **Moderation:** Delete inappropriate comments.
* **Pagination:** Data tables support pagination via URL query parameters.

### 🔑 Test Credentials
To test the admin features, use the following account:
* **Username:** `adminUserExample`
* **Password:** `12345678`
