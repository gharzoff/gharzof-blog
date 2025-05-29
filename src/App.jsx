import { Routes, Route, useNavigate } from "react-router-dom";
import {
  CreatePost,
  EditPost,
  EditProfile,
  Profile,
  RequestResetPassword,
  ResetPassword,
  Main,
  Login,
  Register,
  Detail,
  Error404,
} from "./pages";
import Navbar from "./components/Navbar";
import "./styles/index.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import AuthService from "./services/auth";
import { signUserSuccess } from "./slice/auth";
import { ProgressBar } from "./ui";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const access = localStorage.getItem("access");
      const refresh = localStorage.getItem("refresh");

      if (access) {
        try {
          const response = await AuthService.getUser();
          dispatch(signUserSuccess(response));
        } catch {
          if (refresh) {
            try {
              const { access: newAccess } = await AuthService.refreshToken(refresh);
              localStorage.setItem("access", newAccess);
              const response = await AuthService.getUser();
              dispatch(signUserSuccess(response));
            } catch {
              localStorage.removeItem("access");
              localStorage.removeItem("refresh");
              navigate("/login");
            }
          } else {
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            navigate("/login");
          }
        }
      }
    };

    checkAuth();
  }, [dispatch, navigate]);

  return (
    <div>
      <ProgressBar />
      <div className="container mt-5 mb-5">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts/:id" element={<Detail />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reset-password" element={<RequestResetPassword />} />
          <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
      <Navbar />
    </div>
  );
};

export default App;
