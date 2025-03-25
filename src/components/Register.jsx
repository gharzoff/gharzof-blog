import { useEffect, useState } from "react";
import { logo } from "../constants";
import { Input } from "../ui";
import "../styles/index.css";
import { useDispatch, useSelector } from "react-redux";
import { resetMessage, signUserFailure, signUserStart, signUserSuccess } from "../slice/auth";
import AuthService from "../services/auth";
import ValidationError from "./ValidationError"; // Xato yozilgan nom tuzatildi
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();
    dispatch(signUserStart());

    try {
      const newUser = { username, email, password };
      const { user } = await AuthService.userRegister(newUser);
      dispatch(signUserSuccess(user));
      navigate("/");
    } catch (error) {
      dispatch(signUserFailure(error.response?.data || "Registration failed"));
    }
  };

  useEffect(() => {
    dispatch(resetMessage());
  }, [dispatch]);

  return (
    <div className="text-center">
      <main className="form-signin w-25 m-auto">
        <form onSubmit={registerHandler}>
          <img style={{ opacity: 0.64 }} className="mb-4" src={logo} alt="Logo" width="72" />
          <h1 className="h3 mb-3 fw-normal">Please register</h1>
          <ValidationError />

          <Input label="Username" type="text" state={username} setState={setUsername} />
          <Input label="Email address" type="email" state={email} setState={setEmail} />
          <Input label="Password" type="password" state={password} setState={setPassword} />

          <div className="form-check text-start my-3">
            <input className="form-check-input" type="checkbox" id="flexCheckDefault" />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Remember me
            </label>
          </div>
          <button className="btn btn-primary w-100 py-2" type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default Register;
