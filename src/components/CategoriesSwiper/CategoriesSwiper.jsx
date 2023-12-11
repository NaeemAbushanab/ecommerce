import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "./CategoriesSwiper.css";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Link } from "react-router-dom";

function CategoriesSwiper({ data }) {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar]}
        spaceBetween={10}
        slidesPerView={8}
        navigation
        pagination={{ el: ".swiper-pagination", clickable: true }}
      >
        {data.map((cat) => {
          return (
            <SwiperSlide key={cat._id}>
              <Link to={`/CategoryProducts/${cat._id}`}>
                <div className="w-75">
                  <img src={cat.image.secure_url} alt="img" className="img-fluid" />
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

export default CategoriesSwiper;
