import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import LoadingScreen from "../../shared/loadingScreen/LoadingScreen";
import EmptyContainer from "../../shared/emptyContainer/EmptyContainer";
import ProductCard from "./ProductCard";

function Products() {
  const { catID } = useParams();

  const getData = async () => {
    return axios
      .get(`${import.meta.env.VITE_API_URL}/products/category/${catID}`)
      .then(({ data }) => {
        return data.products;
      });
  };
  const { data, isLoading } = useQuery("webProductCat", getData);
  if (isLoading) {
    return <LoadingScreen />;
  }
  if (data.length == 0) {
    return <EmptyContainer title={"Empty category"} />;
  }
  return (
    <div className="row">
      {data.map((product) => (
        <div key={product._id} className="col-4">
          <ProductCard {...product} />
        </div>
      ))}
    </div>
  );
}

export default Products;
