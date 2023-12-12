import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import EmptyContainer from "../../../components/emptyContainer/EmptyContainer";
import ProductsViewer from "../../../components/productsViewer/ProductsViewer";
import LoadingScreen from "../../../components/loadingScreen/LoadingScreen";
import { CartContext } from "../../../context/Cart";
import { UserContext } from "../../../context/User";

function CategoryProducts() {
  const { catID } = useParams();
  const { isLoadingCart } = useContext(CartContext);
  const { isLoadingUser } = useContext(UserContext);
  const getData = async () => {
    return axios
      .get(`${import.meta.env.VITE_API_URL}/products/category/${catID}`)
      .then(({ data }) => {
        return data.products;
      });
  };
  const { data, isLoading } = useQuery(`${catID}Products`, getData);
  const getComponent = () => {
    if (isLoading) {
      return <LoadingScreen isLoading />;
    }
    if (data.length == 0) {
      return <EmptyContainer title={`Empty category`} />;
    }

    return (
      <LoadingScreen>
        <ProductsViewer data={data} />
      </LoadingScreen>
    );
  };
  return getComponent();
}

export default CategoryProducts;
