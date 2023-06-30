import React from "react";
import Logo from "../img/logo.png";
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <Link className="link" to={`/`}>
          <div className="logo">
            <img src={Logo} alt="logo" />
          </div>
        </Link>

        <div className="links">
          <Link className="link" to="/?cat=technology">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className="link" to="/?cat=education">
            <h6>EDUCATION</h6>
          </Link>
          <Link className="link" to="/?cat=health">
            <h6>HEALTH</h6>
          </Link>


          <span className="write">
            <Link className="link" to="/write">
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
