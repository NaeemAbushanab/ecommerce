import axios from "axios";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import EmptyContainer from "../../../components/emptyContainer/EmptyContainer";
import ReactStars from "react-rating-star-with-type";
import { CartContext } from "../../../context/Cart";
import LoadingScreen from "../../../components/loadingScreen/LoadingScreen";
import ActionCartItemControl from "../../../components/actionCartItemControl/ActionCartItemControl";
import { UserContext } from "../../../context/User";
function Product() {
  const { proID } = useParams();
  let [currImg, setCurrImg] = useState("");
  const { isLoadingCart } = useContext(CartContext);
  const { isLoadingUser } = useContext(UserContext);
  const getData = () =>
    axios.get(`${import.meta.env.VITE_API_URL}/products/${proID}`).then(({ data }) => {
      setCurrImg(data.product.mainImage.secure_url);
      return data.product;
    });
  const { data, isLoading } = useQuery(`product_${proID}`, getData);

  const handleChangeImg = (e) => {
    setCurrImg(e.target.src);
  };

  if (isLoading) {
    return <LoadingScreen isLoading />;
  }
  if (data.lenght == 0) {
    return <EmptyContainer title={"Details is not found"} />;
  }
  return (
    <LoadingScreen isLoading={!isLoadingUser && isLoadingCart}>
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
              <ActionCartItemControl productId={data._id} buttonTitle={"Add to Cart"} />
              <button className="btn btn-info ms-5">Buy now</button>
            </div>
          </div>
        </div>
      </div>
    </LoadingScreen>
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
