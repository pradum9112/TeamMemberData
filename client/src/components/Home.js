import React, { useState, useEffect, useContext } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { NavLink, useNavigate } from "react-router-dom";
import {
  adddata,
  updatedata,
  deldata,
  authdata,
} from "./context/ContextProvider";
import Searchbar from "./Searchbar";

const Home = () => {
  const { udata, setUdata } = useContext(adddata);
  const { updata, setUpdata } = useContext(updatedata);
  const { dltdata, setDLTdata } = useContext(deldata);
  const { loggedIn, setLoggedIn, userId, setUserId } = useContext(authdata);

  const [getuserdata, setUserdata] = useState([]);
  const navigate = useNavigate();

  document.title = "Crud-Application";

  const getdata = async (e) => {
    const admin_id = localStorage.getItem("userId");
    const res = await fetch(`/getdata/${admin_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });
    const data = await res.json();

    if (res.status === 422 || !data) {
      alert("error");
    } else {
      setUserdata(data);
    }
  };

  const deleteuser = async (id) => {
    const res2 = await fetch(`/deleteuser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const deletedata = await res2.json();
    if (res2.status === 422 || !deletedata) {
      console.log("error");
    } else {
      console.log("User delete kar sakte hai");
      setDLTdata(deletedata);
      getdata();
    }
  };

  const handleSearch = async (text) => {
    try {
      const response = await fetch(`/search?text=${text}`);
      if (response.ok) {
        const data = await response.json();
        setUserdata(data);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getdata();
    deleteuser();
    if (!localStorage.getItem("userId")) {
      navigate("/login");
    }
  }, [loggedIn]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUdata(null);
      setUpdata(null);
      setDLTdata(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [udata, updata, dltdata]);

  return (
    <>
      <Searchbar handleSearch={handleSearch} />

      <div style={{ height: "50px" }}>
        {udata ? (
          <>
            <div
              className="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              <strong>{udata.name}</strong> added successfully!
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          </>
        ) : (
          ""
        )}

        {updata ? (
          <>
            <div
              className="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              <strong> {updata.name}</strong> updated successfully!
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          </>
        ) : (
          ""
        )}
        {dltdata ? (
          <>
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              <strong> {dltdata.name} </strong> deleted successfully!
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          </>
        ) : (
          ""
        )}
      </div>

      <div className="mt-5">
        <div className="container">
          <div className="add_btn mt-2 mb-2 ">
            <NavLink to="/register" className="btn btn-dark">
              Add Data
            </NavLink>
          </div>

          <table className="table " id="table">
            <thead>
              <tr className="table-dark">
                <th scope="col">Id</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Job</th>
                <th scope="col">Number</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {getuserdata.map((element, id) => {
                return (
                  <>
                    <tr>
                      <th scope="row">{id + 1}</th>
                      <td>{element.name}</td>
                      <td>{element.email}</td>
                      <td>{element.work}</td>
                      <td>{element.mobile}</td>
                      <td className="d-flex justify-content-between">
                        <NavLink to={`view/${element._id}`}>
                          <button className="btn btn-dark">
                            <RemoveRedEyeIcon />
                          </button>
                        </NavLink>
                        <NavLink to={`edit/${element._id}`}>
                          <button className="btn btn-dark mx-1">
                            <CreateIcon />
                          </button>
                        </NavLink>
                        <button
                          className="btn btn-dark"
                          onClick={() => deleteuser(element._id)}
                        >
                          <DeleteOutlineIcon />
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
