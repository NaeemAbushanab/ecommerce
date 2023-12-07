import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "./Categories.css";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Link } from "react-router-dom";

function Categories() {
  let getCategories = () =>
    axios
      .get(`${import.meta.env.VITE_API_URL}/categories/active?page=1&limit=10`)
      .then(({ data }) => {
        return data;
      });
  const { data, isLoading } = useQuery("web_categories", getCategories);
  if (isLoading) {
    return <div>Loading....</div>;
  }
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar]}
        spaceBetween={50}
        slidesPerView={5}
        navigation
        pagination={{ el: ".swiper-pagination", clickable: true }}
      >
        {data.categories.map((cat) => {
          return (
            <SwiperSlide key={cat._id}>
              <Link to={`/category/${cat._id}`}>
                <img src={cat.image.secure_url} alt="img" />
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

export default Categories;
