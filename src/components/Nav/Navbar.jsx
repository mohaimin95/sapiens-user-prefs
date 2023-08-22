import React, { useContext, useEffect } from "react";
import "./Navbar.css";
import logo from "../../logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { mainContext } from "../../contexts/MainContext";
import axios from "../../utils/axios";

export default function Navbar() {
  const { primaryColor, user, setUser, setPrimaryColor } = useContext(mainContext);
  const navigate = useNavigate();
  const onLogout = () => {
    axios
      .get("/api/user/logout")
      .then(() => {
        setUser(() => null);
      })
      .catch(() => {
        setUser(() => null);
      }).finally(()=>navigate('/login'));
  };
  useEffect(() => {
    axios
      .get("/api/user")
      .then((res) => {
        setUser(() => res.data.user || null);
        if(res.data.user && res.data.user.preferences && res.data.user.preferences.primaryColor)
            setPrimaryColor(res.data.user.preferences.primaryColor)
      })
      .catch(() => {
        setUser(() => null);
      });
  }, []);

  return (
    <nav style={{ backgroundColor: `#${primaryColor}` }}>
      <Link className="brand" to={'/'}>
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <h1>UserPref</h1>
      </Link>
      <div className="nav-menu">
        {user ? (
          <>
            <div className="nav-menu-item">
              <span>(Logged in as {user.username})</span>
            </div>
            <div className="nav-menu-item">
              <span onClick={onLogout}>logout</span>
            </div>
          </>
        ) : (
          <>
            <div className="nav-menu-item">
              <Link to={"/login"}>Login</Link>
            </div>
            <div className="nav-menu-item">
              <Link to={"/signup"}>Signup</Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
