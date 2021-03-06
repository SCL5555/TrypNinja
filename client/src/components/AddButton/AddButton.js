import React from "react";
import "../../style/style.css";
import {Link} from "react-router-dom";

const loggedIn = Boolean(sessionStorage.getItem("TNToken"))
const AddButton = (props) => (
  (loggedIn) ? 
  <div>
      <Link
        to="/add"
        className={window.location.pathname === "/add" ? "nav-link active" : "nav-link"}
      >
        <button type="button" className="btn btn-default btn-lg btn-right">
          <i className="far fa-plus-square"></i>
        </button>
      </Link>
  </div>
  :
  <p>Poop</p>
);

export default AddButton;
