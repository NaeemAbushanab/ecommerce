import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ErrorToast } from "../../../components/toast/Toast";
import LoadingScreen from "../../../components/loadingScreen/LoadingScreen";
import { CartContext } from "../../../context/Cart";
import ProductsViewer from "../../../components/productsViewer/ProductsViewer";
import { useNavigate } from "react-router-dom";
import "./Products.css";
import EmptyContainer from "../../../components/emptyContainer/EmptyContainer";
import { UserContext } from "../../../context/User";
import Pagination from "../../../components/pagination/Pagination";
import FilterProducts from "../../../components/filterProducts/FilterProducts";
function Products() {
  const { isLoadingCart } = useContext(CartContext);
  const { isLoadingUser } = useContext(UserContext);
  const [isLoading, setIsloading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [productsData, setProductsData] = useState(null);
  const [params, setParams] = useState(initialParams);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const navigate = useNavigate();
  const setData = async (_params) => {
    setIsloading(true);
    let url = new URL(`${import.meta.env.VITE_API_URL}/products`);
    for (let i = 0; i < Object.keys(_params).length; i++) {
      if (Object.values(_params)[i] != "")
        url.searchParams.append(Object.keys(_params)[i], Object.values(_params)[i]);
    }
    await axios
      .get(url)
      .catch((error) => {
        ErrorToast(error.response.data.message);
      })
      .then(({ data }) => {
        setTotalPages(Math.ceil(data.total / _params.limit));
        setProductsData(data);
        setParams(_params);
        navigate(url.search);
      })
      .finally(() => {
        setIsloading(false);
      });
  };
  useEffect(() => {
    let _params = {};
    for (let p of urlParams) {
      if (p[0] != "sort" && p[0] != "search") _params[p[0]] = Number(p[1]);
      else _params[p[0]] = p[1];
    }
    setData({
      ...params,
      ..._params,
    });
  }, []);
  if (productsData == null) {
    return <LoadingScreen isLoading={true} />;
  }
  return (
    <LoadingScreen
      displayWithChildren={true}
      isLoading={isLoading || (!isLoadingUser && isLoadingCart)}
    >
      <FilterProducts
        params={params}
        setData={setData}
        setParams={setParams}
        totalPages={productsData.total}
        initialParams={initialParams}
      />
      {productsData.products.length != 0 ? (
        <ProductsViewer data={productsData.products} />
      ) : (
        <EmptyContainer title={"Empty products"} />
      )}
      <Pagination totalPages={totalPages} params={params} setData={setData} />
    </LoadingScreen>
  );
}
export default Products;

const initialParams = {
  page: 1,
  limit: 4,
  sort: "",
  search: "",
  "price[lte]": "",
  "price[gte]": "",
};
