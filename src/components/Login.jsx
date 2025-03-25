import { useEffect, useState } from "react";
import { logo } from "../constants";
import { Input } from "../ui";
import { useDispatch, useSelector } from "react-redux";
import { signUserStart, signUserFailure, signUserSuccess, resetMessage } from "../slice/auth";
import AuthService from "../services/auth";
import ValidationError from "./ValidationError";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetMessage());
  }, [dispatch]);

  const loginHandler = async e => {
    e.preventDefault();
    dispatch(signUserStart());
    try {
      const { user } = await AuthService.userLogin({ email, password });
      dispatch(signUserSuccess(user));
      navigate("/");
    } catch (error) {
      dispatch(signUserFailure(error.response.data));
    }
  };

  return (
    <div className="text-center">
      <main className="form-signin w-25 m-auto">
        <form onSubmit={loginHandler}>
          <img style={{ opacity: 0.64 }} className="mb-4" src={logo} alt="" width="72" />
          <h1 className="h3 mb-3 fw-normal">Please login</h1>
          <ValidationError />
          <Input label="Email address" type="email" state={email} setState={setEmail} />
          <Input label="Password" type="password" state={password} setState={setPassword} />
          <div className="form-check text-start my-3">
            <input className="form-check-input" type="checkbox" id="flexCheckDefault" />
            <label className="form-check-label" htmlFor="flexCheckDefault">Remember me</label>
          </div>
          <button className="btn btn-primary w-100 py-2" type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default Login;
