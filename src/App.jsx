import { Routes, Route } from "react-router-dom";
import {
  Main,
  Login,
  Register,
  Navbar,
  Detail,
  CreateArticle,
  EditArticle,
  Error404,
} from "./components";
import "./styles/index.css";
import { useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import AuthService from "./services/auth";
import ArticleServices from "./services/article";
import { signUserSuccess } from "./slice/auth";
import { ProgressBar } from "./ui";
import {
  getArticleFailure,
  getArticleStart,
  getArticleSuccess,
} from "./slice/article";

const App = () => {
  const dispatch = useDispatch();

  const fetchArticles = useCallback(async () => {
    dispatch(getArticleStart());
    try {
      const response = await ArticleServices.getArticles();
      setTimeout(() => dispatch(getArticleSuccess(response.articles)), 100);
    } catch {
      dispatch(getArticleFailure());
    }
  }, []);

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await AuthService.getUser();
        dispatch(signUserSuccess(response.user));
      } catch (error) {
        console.error("User authentication failed:", error);
      }
    }
    await fetchArticles();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <ProgressBar />
      <div className="container mt-5 mb-5">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/article/:slug" element={<Detail />} />
          <Route path="/create-article" element={<CreateArticle />} />
          <Route path="/edit/:slug" element={<EditArticle />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
      <Navbar />
    </div>
  );
};

export default App;
