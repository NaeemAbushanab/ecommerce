import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../context/Cart";
import EmptyContainer from "../../../components/emptyContainer/EmptyContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import LoadingScreen from "../../../components/loadingScreen/LoadingScreen";
import ActionCartItemControl from "../../../components/actionCartItemControl/ActionCartItemControl";
import "./Cart.css";
function Cart() {
  const navigate = useNavigate();
  const { cartItems, actionsItemCart, isLoadingCart } = useContext(CartContext);
  const handleClick = (productId) => {
    navigate(`/product/${productId}`);
  };
  if (cartItems == null) {
    return <LoadingScreen isLoading={true} />;
  }
  if (cartItems.length == 0) {
    return <EmptyContainer title={"Empty cart"} />;
  }
  const totalPrice = () => {
    let total = 0;
    cartItems.map((cartItem) => {
      total += cartItem.details.finalPrice * cartItem.quantity;
    });
    return total;
  };
  const shippingMethods = [
    { cost: 0.0, name: "Free shipping" },
    { cost: 15.0, name: "Express shipping" },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/order");
  };
  return (
    <LoadingScreen isLoading={isLoadingCart} displayWithChildren={true}>
      <div className="cart">
        <div className="row">
          <div className="col-9 ps-3 pe-5">
            <div className="removeCart mb-5 text-end">
              <button
                className="btn btn-primary"
                onClick={() => {
                  actionsItemCart("", "clear");
                }}
              >
                Clear all cart item
              </button>
            </div>
            {cartItems.map((item) => {
              return (
                <div className="cartItem" key={item.productId}>
                  <div className="row mb-3">
                    <div className="col-2">
                      <div
                        className="prodctImg"
                        onClick={() => handleClick(item.productId)}
                        style={{ cursor: "pointer" }}
                      >
                        <img src={item.details.mainImage.secure_url} alt="" className="img-fluid" />
                      </div>
                    </div>
                    <div className="col-10 d-flex justify-content-between">
                      <div
                        className="d-flex flex-column row-gap-2 infoBar"
                        onClick={() => handleClick(item.productId)}
                        style={{ cursor: "pointer" }}
                      >
                        <h5 className="productTitle">{item.details.name}</h5>
                        <div>
                          <span className="text-primary">price: </span>
                          <span className="fw-bold">{item.details.finalPrice}$</span>
                        </div>
                        <div>
                          <span className="text-primary">Total price: </span>
                          <span className="fw-bold">
                            {item.details.finalPrice * item.quantity}$
                          </span>
                        </div>
                      </div>
                      <div className="d-flex flex-column align-items-end row-gap-4 actionBar">
                        <Link onClick={() => actionsItemCart(item.productId, "remove")}>
                          <FontAwesomeIcon icon={faTrash} />
                        </Link>
                        <ActionCartItemControl productId={item.productId} />
                      </div>

                      <div className="productInfo d-flex justify-content-between"></div>
                    </div>
                  </div>
                  <div className="divider"></div>
                </div>
              );
            })}
          </div>
          <div className="col-3">
            <div className="border rounded summaryCart d-flex flex-column row-gap-3 p-3">
              <div className="text-center">
                <h4>Cart summary</h4>
                <div className="divider w-50 m-auto"></div>
              </div>
              <div className="">
                <span>Shipping method:</span>
                <form onSubmit={handleSubmit} className="shippingMethods">
                  {shippingMethods.map((shippingMethod, i) => (
                    <div key={i} className="form-check position-relative">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="shippingMethod"
                        id={shippingMethod.name}
                        value={shippingMethod.cost}
                      />
                      <label className="form-check-label" htmlFor="flexRadioDefault1">
                        {shippingMethod.name}
                      </label>
                      <span className="text-primary position-absolute end-0">
                        + {shippingMethod.cost}$
                      </span>
                    </div>
                  ))}
                  <div className="divider mt-4"></div>
                  <div className="position-relative">
                    <span>Total Price: </span>
                    <span className="position-absolute text-primary end-0"> {totalPrice()}$</span>
                  </div>
                  <div className="mt-4">
                    <button className="form-control btn btn-primary">Chekout</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LoadingScreen>
  );
}

export default Cart;
