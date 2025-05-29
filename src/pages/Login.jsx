import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signUserStart,
  signUserFailure,
  signUserSuccess,
  resetMessage,
  setToken,
} from "../slice/auth";
import AuthService from "../services/auth";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../constants";
import { ValidationError } from "../ui";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(resetMessage());
  }, [dispatch]);

  const loginHandler = async (e) => {
    e.preventDefault();
    dispatch(signUserStart());
    try {
      const tokens = await AuthService.userLogin({ email, password });
      dispatch(setToken(tokens));
      const user = await AuthService.getUser();
      dispatch(signUserSuccess(user));
      navigate("/");
    } catch (error) {
      dispatch(
        signUserFailure(
          error?.response?.data || {
            errors: { Xatolik: ["Kirishda xatolik yuz berdi"] },
          }
        )
      );
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-5 border p-4 shadow rounded bg-white">
        <form onSubmit={loginHandler}>
          <div className="text-center mb-4">
            <h2 className="h4">Tizimga kirish</h2>
            <p className="text-muted">Iltimos, akkauntingizga kiring</p>
          </div>

          <ValidationError />

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingEmail"
              placeholder="Email manzilingiz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="floatingEmail">Email manzilingiz</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Parolingiz"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="floatingPassword">Parolingiz</label>
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="rememberMe"
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Meni eslab qol
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={isLoading}
          >
            {isLoading ? "Yuklanmoqda..." : "Kirish"}
          </button>

          <div className="mt-3 text-end">
            <Link to="/reset-password" className="text-decoration-none">
              Parolni unutdingizmi?
            </Link>
          </div>

          <div className="mt-3 text-center">
            Akkount yo‘qmi?{" "}
            <Link to="/register" className="text-decoration-none">
              Ro‘yxatdan o‘tish
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
