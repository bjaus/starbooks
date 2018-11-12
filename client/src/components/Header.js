import React from "react";
import logo from "../logo.png";
import "./component.css";

const Header = () => {
  return (
    <header className="container-fluid text-center">
      <div className="row align-items-center">
        <div className="col-2">
          <img id="logo" src={logo} alt="StarBooks Logo" />
        </div>
        <div className="col-8">
          <h1 id="title" className="hidden-phone display-4 text-white">
            Dashboard
          </h1>
        </div>
        {/* <div className="col-2">
          <img id="logo" src={logo} alt="StarBooks Logo" />
        </div> */}
      </div>
    </header>
  );
};

export default Header;
