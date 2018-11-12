import React, { Component } from "react";
import axios from "axios";
import logo from "../logo.png";

// import './style/Navbar.css';

class Navbar extends Component {
  onUpload(e) {
    e.preventDefault();
    // axios
    //   .post('http://localhost:5000/api/upload', e.data)
    console.log(e);
  }

  render() {
    return (
      <nav className="navbar navbar-expend-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <div className="navbar-brand">
            <img
              src={logo}
              alt="StarBooks Logo"
              style={{ width: "50%", height: "50%" }}
            />
          </div>
          <div className="nav-item">
            <form
              className="form-group"
              action="http://localhost:5000/api/upload"
              method="post"
              enctyp="multipart/form-data"
            >
              <input
                className="btn btn-block"
                style={{ color: "white", marginRight: "-100px" }}
                type="file"
                name="file"
              />
              <input
                type="submit"
                onClick={this.onUpload.bind(this)}
                value="Upload"
              />
            </form>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
