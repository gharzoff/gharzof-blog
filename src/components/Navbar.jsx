import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../slice/auth";
import { BASE_URL, logo } from "../constants";
import { PlusCircle, PersonCircle, BoxArrowRight, BoxArrowInRight, PersonPlus } from "react-bootstrap-icons";

const Navbar = () => {
  const { loggedIn, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser());
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  return (
    <>
      <header
        className="border-top shadow-lg"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          zIndex: 1050,
          height: "70px",
          display: "flex",
          alignItems: "center",
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
        }}
      >
        <div className="container d-flex justify-content-between align-items-center px-3">
          {/* Logo */}
          <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
            <img src={logo} alt="Logo" width={115} style={{ objectFit: "contain" }} />
          </Link>

          {/* Right Side */}
          <div className="d-flex align-items-center gap-3">
            {loggedIn ? (
              <>
                <Link to="/create" className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1">
                  <PlusCircle size={18} />
                  <span className="d-none d-sm-inline">Yaratish</span>
                </Link>

                <Link to="/profile" className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1">
                  {user?.profile_image ? (
                    <img
                      src={BASE_URL + user?.profile_image}
                      alt="Profile"
                      width={18}
                      height={18}
                      className="rounded-circle"
                    />
                  ) : (
                    <PersonCircle size={22} />
                  )}
                  <span className="d-none d-sm-inline">{user?.username}</span>
                </Link>

                <button onClick={logoutHandler} className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1">
                  <BoxArrowRight size={18} />
                  <span className="d-none d-sm-inline">Chiqish</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-dark btn-sm d-flex align-items-center gap-1">
                  <BoxArrowInRight size={18} />
                  <span className="d-none d-sm-inline">Kirish</span>
                </Link>
                <Link to="/register" className="btn btn-outline-warning btn-sm d-flex align-items-center gap-1">
                  <PersonPlus size={18} />
                  <span className="d-none d-sm-inline">Ro'yxatdan o'tish</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Kontent to‘qnashmasligi uchun padding */}
      <div style={{ paddingBottom: "80px" }}></div>
    </>
  );
};

export default Navbar;
