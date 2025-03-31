import { logo } from "../constants";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../slice/auth";

const Navbar = () => {
  const { loggedIn, user } = useSelector(({ auth }) => auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser());
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      className="d-flex flex-column flex-md-row align-items-center border-top"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "80px",
        zIndex: 1000,
        background: "rgba(0, 0, 0, 0.85)",
        color: "white",
        backdropFilter: "blur(10px)",
        boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div className="d-flex w-100 align-items-center px-3 justify-content-between">
        <Link to="/" className="d-md-inline d-none">
          <img src={logo} width={72} alt="Logo" />
        </Link>
        <div className="d-flex gap-3 align-items-center">
          <Link to="/" className="d-md-none btn btn-primary">Home</Link>
          {loggedIn ? (
            <>
              <span className="text-white">{user.username}</span>
              <Link className="btn btn-success" to="/create-article">Create</Link>
              <button className="btn btn-danger" onClick={logoutHandler}>Logout</button>
            </>
          ) : (
            <>
              <Link className="btn btn-light" to="/login">Login</Link>
              <Link className="btn btn-warning" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;