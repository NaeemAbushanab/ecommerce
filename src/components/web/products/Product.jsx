import axios from "axios";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import LoadingScreen from "../../shared/loadingScreen/LoadingScreen";
import EmptyContainer from "../../shared/emptyContainer/EmptyContainer";
import ReactStars from "react-rating-star-with-type";
import { CartContext } from "../context/Cart";

function Product() {
  const { proID } = useParams();
  let [currImg, setCurrImg] = useState("");
  const { handleAddToCartContext } = useContext(CartContext);
  const getData = () =>
    axios.get(`${import.meta.env.VITE_API_URL}/products/${proID}`).then(({ data }) => {
      setCurrImg(data.product.mainImage.secure_url);
      return data.product;
    });
  const { data, isLoading } = useQuery(`product_${proID}`, getData);

  const handleChangeImg = (e) => {
    setCurrImg(e.target.src);
  };
  const handleAddToCart = () => {
    handleAddToCartContext(proID);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }
  if (data == undefined || data.lenght == 0) {
    return <EmptyContainer title={"Details is not found"} />;
  }
  return (
    <div className="row ">
      <div className="col-5">
        <div className="row">
          <div className="col-2">
            <img
              src={data.mainImage.secure_url}
              alt={data.description}
              className="mb-3"
              style={{ cursor: "pointer" }}
              onClick={handleChangeImg}
            />
            {data.subImages.map((img, i) => (
              <img
                key={i}
                src={img.secure_url}
                alt={data.description}
                className="mb-3"
                style={{ cursor: "pointer" }}
                onClick={handleChangeImg}
              />
            ))}
          </div>
          <div className="col-10">
            <img src={currImg} alt={data.description} className="mb-3" />
          </div>
        </div>
      </div>
      <div className="col-7">
        <div className="title">
          <h2>{data.name}</h2>
        </div>
        <div className="d-flex column-gap-2">
          <span>{data.ratingNumbers}</span>
          <ReactStars
            value={data.ratingNumbers}
            edit={false}
            activeColors={["#0d6efd", "#0d6efd", "#0d6efd", "#0d6efd", "#0d6efd"]}
          />
          <span>{data.number_sellers} sell</span>
          <span> | {data.stock} in stock</span>
        </div>
        <div className="divider"></div>
        <div className="d-flex flex-column row-gap-3">
          <div>
            <span className="fw-bold">Price: </span>
            {isHaveDiscound(data.price, data.discount)}
          </div>
          <div>
            <p>
              <span className="fw-bold">Description:</span> {data.description}
            </p>
          </div>
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary me-5" onClick={handleAddToCart}>
              Add to cart
            </button>
            <button className="btn btn-info">Buy now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const isHaveDiscound = (price, discount) => {
  if (discount != 0) {
    return (
      <>
        <span className="price me-2">{price}$</span>
        <span>{price - discount}$</span>
      </>
    );
  }
  return <span>{price}$</span>;
};
export default Product;
