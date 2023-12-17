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
import { ErrorToast, WarningToast } from "../../../components/toast/Toast";
import { OrderContext } from "../../../context/Order";
function Product() {
  const { proID } = useParams();
  let [currImg, setCurrImg] = useState("");
  const { isLoadingCart } = useContext(CartContext);
  const { isLoadingUser, userInfo } = useContext(UserContext);
  const { ordersData, isLoadingOrders } = useContext(OrderContext);
  const [review, setReview] = useState({ comment: "", rating: 0 });
  const [canReview, setCanReview] = useState(false);
  const [isReviewed, setIsReviewed] = useState(false);
  if (!isLoadingOrders) {
    ordersData.map((order) => {
      order.products.map((product) => {
        if (order.status == "deliverd" && product.productId == proID && canReview == false) {
          setCanReview(true);
          return;
        }
      });
    });
  }
  const getData = () =>
    axios.get(`${import.meta.env.VITE_API_URL}/products/${proID}`).then(({ data }) => {
      setCurrImg(data.product.mainImage.secure_url);
      return data.product;
    });
  const { data, isLoading } = useQuery(`product_${proID}`, getData);

  const handleChangeImg = (e) => {
    setCurrImg(e.target.src);
  };
  const handleOnChangeTextArea = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
    setReview({ ...review, comment: e.target.value });
  };
  const handleOnClickAddReview = async (e) => {
    e.preventDefault();
    if (review.comment != "") {
      await axios
        .post(`${import.meta.env.VITE_API_URL}/products/${proID}/review`, review, {
          headers: { Authorization: `Tariq__${localStorage.getItem("userToken")}` },
        })
        .catch((error) => {
          ErrorToast(error.response.data.message);
        })
        .then(({ data }) => {
          setIsReviewed(true);
        })
        .finally(() => {});
    } else WarningToast("empty comment");
  };
  const onChange = (value) => {
    setReview({ ...review, rating: value });
  };
  if (isLoading) {
    return <LoadingScreen isLoading />;
  }
  if (data.lenght == 0) {
    return <EmptyContainer title={"Details is not found"} />;
  }
  if (!isLoadingUser) {
    data.reviews.map((_review) => {
      if (_review.createdBy == userInfo?._id && isReviewed == false) {
        setIsReviewed(true);
        setReview({ comment: _review.comment, rating: _review.rating });
        return;
      }
    });
  }

  return (
    <LoadingScreen
      isLoading={isLoading || (!isLoadingUser && isLoadingCart)}
      displayWithChildren={true}
    >
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
            <h3>{data.name}</h3>
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
          {canReview && (
            <div>
              <div className="divider my-4"></div>
              <h3>Your review</h3>
              <textarea
                onChange={handleOnChangeTextArea}
                type="text"
                name="review"
                id="review"
                className="form-control overflow-hidden"
                style={{ resize: "none" }}
                placeholder="add your review"
                value={review.comment}
                disabled={!isReviewed ? false : true}
              />
              <div className="d-flex justify-content-between">
                <ReactStars
                  value={review.rating}
                  onChange={onChange}
                  activeColor="#0d6efd"
                  inactiveColor="#0d6efd"
                  count={5}
                  isEdit={isReviewed ? false : true}
                  isHalf={true}
                  size={24}
                />
                <button
                  className={`btn btn-primary mt-3 ${isReviewed ? "d-none" : ""}`}
                  onClick={handleOnClickAddReview}
                >
                  Add review
                </button>
              </div>
            </div>
          )}
          {data.reviews.length > 0 && (
            <div className="mt-3">
              <div className="divider my-4"></div>
              <h3>People reviews</h3>
              <div className="d-flex flex-column mt-2">
                {data.reviews.map((review, i) => {
                  return (
                    <React.Fragment key={i}>
                      <div className="d-flex align-items-center column-gap-3 my-2">
                        <span>{review.comment}</span>
                        <ReactStars
                          value={review.rating}
                          onChange={onChange}
                          activeColor="#0d6efd"
                          inactiveColor="#0d6efd"
                          count={5}
                          isEdit={false}
                          isHalf={true}
                          size={15}
                        />
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          )}
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
