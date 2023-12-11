import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-star-with-type";
import discountIcon from "./discount.png";
import "./ProductCard.css";
import { CartContext } from "../../context/Cart";
import ActionCartItemControl from "../actionCartItemControl/ActionCartItemControl";

function ProductCard({
  mainImage,
  name,
  description,
  price,
  ratingNumbers,
  stock,
  discount,
  _id,
  number_sellers,
}) {
  const { cartItems, isLoadingCart } = useContext(CartContext);
  let isAddedToCart = { message: false, quantity: 1 };
  if (!isLoadingCart) {
    cartItems.map((cartItem) => {
      if (cartItem.productId == _id) {
        isAddedToCart = { message: true, quantity: cartItem.quantity };
      }
    });
  }

  return (
    <div className="card" style={{ width: "18rem" }}>
      <Link to={`/product/${_id}`}>
        <img src={mainImage.secure_url} className="card-img-top img-card" alt={description} />
        <div className="text-center mt-2">
          <h5 className="card-title text-dark">{name}</h5>
        </div>
      </Link>
      <div className="card-body text-center">
        <div className="text-start d-flex justify-content-between">
          <ActionCartItemControl productId={_id} isAdded={isAddedToCart} />
          <div className="d-flex align-items-center">
            <ReactStars
              value={ratingNumbers}
              edit={false}
              activeColors={["#0d6efd", "#0d6efd", "#0d6efd", "#0d6efd", "#0d6efd"]}
            />
            <span style={{ textDecoration: "underline", marginLeft: "2px" }}>{number_sellers}</span>
          </div>
        </div>
      </div>
      <div className="card-footer bg-white">
        <div className="d-flex justify-content-between">
          {isHaveDiscound(price, discount)}
          <div>
            <small>{stock} in stock</small>
          </div>
        </div>
      </div>
    </div>
  );
}
const isHaveDiscound = (price, discount) => {
  if (discount != 0) {
    return (
      <div>
        <div className="discountTag">
          <img src={discountIcon} alt="priceTag" className="img-fluid" />
        </div>
        <small className="priceCard me-2">{price}$</small>
        <small>{price - discount}$</small>
      </div>
    );
  }
  return (
    <div>
      <small>{price}$</small>
    </div>
  );
};
export default ProductCard;
