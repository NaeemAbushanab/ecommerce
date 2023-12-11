import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "./ProductsSwiper.css";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Link } from "react-router-dom";

function ProductsSwiper({ data, linkPath = "CategoryProducts" }) {
  const getImage = (item) => {
    let src;
    if (linkPath == "CategoryProducts") {
      src = item.image.secure_url;
    } else {
      src = item.mainImage.secure_url;
    }
    return <img src={src} alt="img" className="img-fluid" />;
  };
  const getInfo = (item) => {
    if (linkPath != "CategoryProducts") {
      return (
        <>
          <span className="text-center">{item.name}</span>
          <div className="d-flex justify-content-around w-100 mt-4 ">
            <span className="text-primary">{item.finalPrice}$</span>
            <span>x{item.quantity}</span>
          </div>
        </>
      );
    }
  };
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar]}
        spaceBetween={10}
        slidesPerView={8}
        navigation
        pagination={{ el: ".swiper-pagination", clickable: true }}
      >
        {data.map((item) => {
          return (
            <SwiperSlide key={item._id}>
              <Link to={`/${linkPath}/${item._id}`}>
                <div className="d-flex flex-column align-items-center">
                  <div className="w-75">{getImage(item)}</div>
                  {getInfo(item)}
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="position-relative mt-5">
        <div className="swiper-pagination"></div>
      </div>
    </>
  );
}

export default ProductsSwiper;
