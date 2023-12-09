import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/User";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../context/Cart";
function Navbar() {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(UserContext);
  const { cartItems } = useContext(CartContext);
  const handleLogout = () => {
    setUserInfo(null);
    localStorage.removeItem("userToken");
    navigate("/");
  };

  return (
    <nav>
      <div className="container">
        <div className="row py-3 align-items-center">
          <div className="col-2 navTitle">
            <h2>T-shop</h2>
          </div>
          <div className="col-8 navList d-flex justify-content-center">
            <ul className="d-flex column-gap-3">
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/categories"}>Categories</Link>
              </li>
              <li>
                <Link to={"/"}>Products</Link>
              </li>
            </ul>
          </div>
          <div className="col-2 navAccount  d-flex justify-content-center">
            <div className="dropdown d-flex justify-content-around align-items-center">
              {isUserLogIn(userInfo, handleLogout, cartItems)}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
const isUserLogIn = (user, handleLogout, cartItems) => {
  if (user) {
    return (
      <>
        <Link to={"/cart"} className="cartIcon ">
          <span className="cartNumber">{cartItems?.length ? cartItems?.length : 0}</span>
          <i className="fs-4">
            <FontAwesomeIcon icon={faCartShopping} />
          </i>
        </Link>
        <button
          className="btn dropdown-toggle p-0 w-25"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src={user.image.secure_url}
            alt="userImage"
            className="img-fluid rounded-circle border border-light-subtle"
          />
        </button>
        <ul className="dropdown-menu">
          <li>
            <Link to={"/"} className="dropdown-item">
              Profile
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link className="dropdown-item" onClick={handleLogout}>
              Log out
            </Link>
          </li>
        </ul>
      </>
    );
  }
  return (
    <>
      <button
        className="btn dropdown-toggle p-0"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <h5 className="d-inline">Account</h5>
      </button>
      <ul className="dropdown-menu">
        <li>
          <Link className="dropdown-item" to={"/register"}>
            Register
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <Link className="dropdown-item" to={"/signin"}>
            Log in
          </Link>
        </li>
      </ul>
    </>
  );
};
export default Navbar;
