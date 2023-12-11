import React, { useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import CategoriesSwiper from "../../../components/CategoriesSwiper/CategoriesSwiper.jsx";
import LoadingScreen from "../../../components/loadingScreen/LoadingScreen.jsx";
function Categories() {
  let getMainCategories = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/categories/active?page=1&limit=10`,
      {
        headers: { Authorization: `Tariq__${localStorage.getItem("userToken")}` },
      }
    );
    return data.categories;
  };
  const { data, isLoading } = useQuery("mainCategories", getMainCategories);
  if (isLoading) {
    return <LoadingScreen isLoading={true} />;
  }
  return (
    <div>
      <div className="title text-center">
        <h2 className="catTitle mb-5">Categories</h2>
      </div>
      <div>
        <h3 className="mb-5 border-0 border-bottom d-inline-block">Main categories</h3>
        <CategoriesSwiper data={data} />
      </div>
    </div>
  );
}

export default Categories;
