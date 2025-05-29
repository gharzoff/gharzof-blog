import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signUserStart,
  signUserFailure,
  resetMessage,
} from "../slice/auth";
import AuthService from "../services/auth";
import { useNavigate, Link } from "react-router-dom";
import { logo } from "../constants";
import { ValidationError } from "../ui";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(resetMessage());
  }, [dispatch]);

  const registerHandler = async (e) => {
    e.preventDefault();
    dispatch(signUserStart());
    try {
      const newUser = { username, email, password };
      await AuthService.userRegister(newUser);
      dispatch(resetMessage());
      navigate("/login");
    } catch (error) {
      dispatch(
        signUserFailure(
          error.response?.data || {
            errors: { Xatolik: ["Ro‘yxatdan o‘tishda xatolik"] },
          }
        )
      );
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-5 border p-4 shadow rounded bg-white">
        <form onSubmit={registerHandler}>
          <div className="text-center mb-4">
            <h2 className="h4">Ro‘yxatdan o‘tish</h2>
            <p className="text-muted">Iltimos, hisob yarating</p>
          </div>

          <ValidationError />

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingUsername"
              placeholder="Foydalanuvchi nomi"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="floatingUsername">Foydalanuvchi nomi</label>
          </div>

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
              minLength={6}
            />
            <label htmlFor="floatingPassword">Parolingiz</label>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={isLoading}
          >
            {isLoading ? "Yuklanmoqda..." : "Ro‘yxatdan o‘tish"}
          </button>

          <div className="mt-3 text-center">
            Hisobingiz bormi?{" "}
            <Link to="/login" className="text-decoration-none">
              Tizimga kirish
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
