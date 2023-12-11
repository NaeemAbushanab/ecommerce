import React from "react";
import { useContext } from "react";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import "./ActionCartItemControl.css";
import { CartContext } from "../../context/Cart";
import { UserContext } from "../../context/User";
import { WarningToast } from "../toast/Toast";
function ActionCartItemControl({ productId, buttonTitle = <FontAwesomeIcon icon={faPlus} /> }) {
  const { cartItems, actionsItemCart } = useContext(CartContext);
  const { isLoadingUser } = useContext(UserContext);
  const navigate = useNavigate();
  let isAdded = false;
  let quantity = 1;
  cartItems?.map((cartItem) => {
    if (cartItem.productId == productId) {
      isAdded = true;
      quantity = cartItem.quantity;
    }
  });
  const handleOnClick = (action) => {
    if (isLoadingUser) {
      WarningToast(
        <div>
          you must login
          <button className="ms-3 btn bg-white text-dark" onClick={() => navigate("/login")}>
            login
          </button>
        </div>
      );
    } else {
      if (quantity == 1 && action == "decrase") {
        actionsItemCart(productId, "remove");
      }
      actionsItemCart(productId, action);
    }
  };
  if (!isAdded) {
    return (
      <button
        onClick={() => handleOnClick("add")}
        className="btn btn-primary d-flex justify-content-center align-items-center"
      >
        {buttonTitle}
      </button>
    );
  }
  return (
    <div className="quantity d-flex justify-content-between">
      <Link onClick={() => handleOnClick("increase")}>
        <FontAwesomeIcon icon={faPlus} />
      </Link>
      <span className="mx-4">{quantity}</span>
      <Link onClick={() => handleOnClick("decrase")}>
        <FontAwesomeIcon icon={faMinus} />
      </Link>
    </div>
  );
}
export default ActionCartItemControl;
