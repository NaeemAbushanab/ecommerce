import React from "react";
import "./Cart.css";
import { useContext } from "react";
import { CartContext } from "../context/Cart";
import { useQuery } from "react-query";
import LoadingScreen from "../../shared/loadingScreen/LoadingScreen";
import EmptyContainer from "../../shared/emptyContainer/EmptyContainer";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
function Cart() {
  const { cartItems, actionsItemCart } = useContext(CartContext);
  if (cartItems == null) {
    return <LoadingScreen />;
  }
  if (cartItems.length == 0) {
    return <EmptyContainer title={"Empty cart"} />;
  }
  return (
    <div className="cart">
      <div className="row">
        <div className="col-9 ps-3 pe-5">
          {cartItems.map((item) => {
            return (
              <React.Fragment key={item.productId}>
                <div className="row mb-3">
                  <div className="col-2">
                    <div className="prodctImg">
                      <img src={item.details.mainImage.secure_url} alt="" className="img-fluid" />
                    </div>
                  </div>
                  <div className="col-10 d-flex flex-column row-gap-4">
                    <div className="d-flex justify-content-between">
                      <h5 className="productTitle">{item.details.name}</h5>
                      <Link onClick={() => actionsItemCart(item.productId, 0)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </Link>
                    </div>
                    <div className="productInfo d-flex justify-content-between">
                      <span className="fw-bold">{item.details.finalPrice}$</span>
                      <div className="quantity d-flex justify-content-between">
                        <Link onClick={() => actionsItemCart(item.productId, item.quantity + 1)}>
                          <FontAwesomeIcon icon={faPlus} />
                        </Link>
                        {item.quantity}
                        <Link onClick={() => actionsItemCart(item.productId, item.quantity - 1)}>
                          <FontAwesomeIcon icon={faMinus} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="divider"></div>
              </React.Fragment>
            );
          })}
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
}

export default Cart;
