import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

class Navbar extends Component {

  logout = event => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("fbToken");
    localStorage.removeItem("googleToken");
    this.props.clearState()
  };

  render() {
    let user = localStorage.getItem("currUser_id");
    let loginLogout;
    let navbarBrand;
    let signup;
    if (user) {
      loginLogout = (
        <NavLink to="/">
          <div className="navbar-right-div btn logout" onClick={this.logout}>
            Logout
          </div>
        </NavLink>
      );
      navbarBrand = (
        <NavLink to="/home">
          <div className="navbar-brand">
            <img src={require("./logo.png")} width="40" height="30" className="mr-1" />
            Budgey
          </div>
        </NavLink>
      );
    } else {
      loginLogout = (
        <NavLink to="/login">
          <div className="navbar-right-div btn login">Login</div>
        </NavLink>
      );
      signup = (
        <NavLink to="/signup">
          <div className="navbar-right-div btn login">Signup</div>
        </NavLink>
      );
      navbarBrand = (
        <NavLink to="/">
          <div className="navbar-brand">
            <img src={require("./logo.png")} width="40" height="30" className="mr-1"/>
            Budgey
          </div>
        </NavLink>
      );
    }
    return (
      <nav className="navbar justify-content-between px-5">
        {navbarBrand}
        <div className="navbar justify-content-between">
          {signup}
          {loginLogout}
        </div>
      </nav>
    );
  }
}

export default Navbar;
