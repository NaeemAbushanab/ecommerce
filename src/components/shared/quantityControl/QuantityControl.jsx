import React from "react";
import { useContext } from "react";
import { CartContext } from "../../web/context/Cart";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./QuantityControl.css";
function QuantityControl({ productId, buttonTitle = <FontAwesomeIcon icon={faPlus} /> }) {
  const { cartItems, actionsItemCart } = useContext(CartContext);
  let isAdded = false;
  let quantity = 1;
  cartItems?.map((cartItem) => {
    if (cartItem.productId == productId) {
      isAdded = true;
      quantity = cartItem.quantity;
    }
  });
  if (!isAdded) {
    return (
      <button
        onClick={() => actionsItemCart(productId, 1)}
        className="btn btn-primary d-flex justify-content-center align-items-center"
      >
        {buttonTitle}
      </button>
    );
  }
  return (
    <div className="quantity d-flex justify-content-between">
      <Link onClick={() => actionsItemCart(productId, quantity + 1)}>
        <FontAwesomeIcon icon={faPlus} />
      </Link>
      <span className="mx-4">{quantity}</span>
      <Link onClick={() => actionsItemCart(productId, quantity - 1)}>
        <FontAwesomeIcon icon={faMinus} />
      </Link>
    </div>
  );
}

export default QuantityControl;
