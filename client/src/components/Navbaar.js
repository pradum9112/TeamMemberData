import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { authdata } from "./context/ContextProvider";

function Navbaar() {
  const { loggedIn, setLoggedIn } = useContext(authdata);

  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
  };
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [loggedIn]);
  return (
    <header>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiar "
        style={{ backgroundColor: "#4a769c" }}
      >
        <div className="container-fluid" style={{ marginLeft: "3rem" }}>
          <NavLink className="navbar-brand" to="/">
            TeamMemberData
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
            </ul>

            <form className="form-inline me-4 ">
              {loggedIn ? ( // Check if user is logged in
                <button
                  className="btn btn-outline-dark me-2 my-2 my-sm-0"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <>
                  <NavLink to="/login">
                    <button
                      className="btn btn-outline-dark me-2 my-2  my-sm-0 "
                      type="submit"
                    >
                      LogIn
                    </button>
                  </NavLink>

                  <NavLink to="/signup">
                    <button
                      className="btn btn-outline-dark  my-2 my-sm-0"
                      type="submit"
                    >
                      SignUp
                    </button>
                  </NavLink>
                </>
              )}
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbaar;
