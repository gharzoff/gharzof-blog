# React Blog Application

Welcome to the **React Blog Application**! 🚀 This is a fully functional blog platform built with React and Redux. The application allows users to create, edit, and delete articles while maintaining a seamless and dynamic user experience.

## 📌 Features

- 📝 Create, edit, and delete articles
- 🔐 User authentication (login/register/logout)
- 🗂️ Redux state management for efficient data handling
- 📄 Detailed article view with author information
- ⚡ Smooth navigation using React Router

## 🏗️ Tech Stack

- **Frontend:** React, Redux, React Router
- **State Management:** Redux Toolkit
- **Styling:** Bootstrap
- **Backend API:** Docker-based API (separate service)

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/abdulghaniarzikul/blog-app.git
cd blog-app
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Start the Application

```sh
npm run dev
```

This will start the development server at `http://localhost:3000`.

### 4️⃣ Connect to the API

Ensure your backend API (Docker-based) is running before using the application.

```sh
docker-compose up -d
```

## 📂 Project Structure

```
react-blog-app/
│── src/
│   ├── components/       # Reusable components (Navbar, ArticleCard, etc.)
│   ├── constants/        # Constants values (Logos, colors, etc.)
│   ├── services/         # API service calls
│   ├── slice/            # Redux slices (auth, article)
│   ├── store/            # Redux store (index)
│   ├── ui/               # UI components (forms, validation, etc.)
│   ├── styles/           # Global CSS styles
│   ├── App.js            # Main application entry point
│   ├── index.js          # React DOM rendering
│── public/
│── package.json
│── README.md
│.
|.
|.
```

## 🛠️ Available Scripts

### Run the development server

```sh
npm run dev
```

### Build the application

```sh
npm run build
```

### Run tests

```sh
npm test
```

## 🎯 Future Improvements

- 🔎 Full-text search for articles
- 📢 Commenting system
- 🎨 Dark mode support
- 🔥 Improved article recommendations

## 📜 License

This project is licensed under the MIT License.

---

🌟 **Enjoy building your blog!** If you like this project, don't forget to ⭐️ the repository!

