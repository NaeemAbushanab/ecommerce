import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ErrorToast } from "../../../components/toast/Toast";
import LoadingScreen from "../../../components/loadingScreen/LoadingScreen";
import { CartContext } from "../../../context/Cart";
import ProductsViewer from "../../../components/productsViewer/ProductsViewer";
import { Link } from "react-router-dom";
import "./Products.css";
import EmptyContainer from "../../../components/emptyContainer/EmptyContainer";
import Input from "../../../components/input/Input";
function Products() {
  const { isLoadingCart } = useContext(CartContext);
  const [isLoading, setIsloading] = useState(true);
  let [params, setParams] = useState({ page: 1, limit: 4 });
  let [totalPages, setTotalPages] = useState(0);
  let [productsData, setProductsData] = useState(null);
  let [filterDataByPrice, setFilterDataByPrice] = useState({ gte: "", lte: "" });
  let [sort, setSort] = useState("default");
  let sortOptions = ["default", "price", "-price", "name", "-name", "discount", "-discount"];
  const setData = async (_params) => {
    setIsloading(true);
    let url = new URL(`${import.meta.env.VITE_API_URL}/products`);
    for (let i = 0; i < Object.keys(_params).length; i++) {
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
      })
      .finally(() => {
        setIsloading(false);
      });
  };
  const handleChangePage = (i) => {
    if (params.page != i) {
      setData({
        ...params,
        page: Number(i),
      });
    }
  };
  const handleChangeFilterDataByPrice = (e) => {
    setFilterDataByPrice({ ...filterDataByPrice, [e.target.name]: Number(e.target.value) });
  };
  const handleOnSubmitFilterByPrice = async (e) => {
    e.preventDefault();
    let gte = filterDataByPrice.gte;
    let lte = filterDataByPrice.lte;
    if (gte != "" && lte != "") {
      if (filterDataByPrice.gte < 5) {
        gte = 5;
        setFilterDataByPrice({ ...filterDataByPrice, gte: gte });
      }
      setData({
        ...params,
        "price[gte]": gte,
        "price[lte]": lte,
      });
    }
  };
  useEffect(() => {
    setData(params);
  }, []);
  if (productsData == null) {
    return <LoadingScreen isLoading={true} />;
  }
  return (
    <LoadingScreen displayWithChildren={true} isLoading={isLoading || isLoadingCart}>
      <div className="my-4 filterData d-flex align-items-center column-gap-4">
        <div className="text-center">
          <label>Display</label>
          <select
            onChange={(e) => {
              const limit = e.target.value;
              const totalPages = Math.ceil(productsData.total / limit);
              if (params.page > totalPages)
                params = {
                  ...params,
                  page: totalPages,
                };
              setData({
                ...params,
                limit: Number(limit),
              });
            }}
            value={params.limit}
            className="form-select"
            style={{ width: "unset" }}
          >
            {[...Array(productsData.total)].map((count, i) => {
              if (i > 0) {
                return (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                );
              }
            })}
          </select>
        </div>
        <div className="text-center">
          <label>Sort by</label>
          <select
            onChange={(e) => {
              const sortOption = e.target.value;
              if (sortOption == "default") setData(params);
              else setData({ ...params, sort: sortOption });
              setSort(sortOption);
            }}
            value={sort}
            className="form-select"
            style={{ width: "unset" }}
          >
            {sortOptions.map((sortOption, i) => {
              return (
                <option key={i} value={sortOption}>
                  {sortOption}
                </option>
              );
            })}
          </select>
        </div>
        <form
          onSubmit={handleOnSubmitFilterByPrice}
          className="filterByPrice d-flex align-items-end"
        >
          <Input
            customStyleDivFather={"text-center mb-0 w-25 me-2"}
            title={"Price from"}
            value={filterDataByPrice.gte}
            name={"gte"}
            placeholder={"min"}
            onChange={handleChangeFilterDataByPrice}
          />
          <Input
            customStyleDivFather={"text-center mb-0 w-25"}
            title={"Price to"}
            name={"lte"}
            value={filterDataByPrice.lte}
            placeholder={"max"}
            onChange={handleChangeFilterDataByPrice}
          />
          <button type="submit" className="btn btn-primary ms-1">
            Go
          </button>
        </form>
      </div>
      {productsData.products.length != 0 ? (
        <ProductsViewer data={productsData.products} />
      ) : (
        <EmptyContainer title={"Empty products"} />
      )}
      <div className="d-flex justify-content-center pt-5">
        <nav aria-label="...">
          <ul className="pagination">
            <li className={`page-item ${params.page - 1 == 0 ? "disabled" : ""}`}>
              <Link className="page-link" onClick={() => handleChangePage(params.page - 1)}>
                Previous
              </Link>
            </li>
            {[...Array(totalPages)].map((arr, i) => {
              return (
                <li key={i} className={`page-item ${params.page == i + 1 ? "active" : ""}`}>
                  <Link onClick={() => handleChangePage(i + 1)} className="page-link">
                    {i + 1}
                  </Link>
                </li>
              );
            })}
            <li className={`page-item ${params.page == totalPages ? "disabled" : ""}`}>
              <Link onClick={() => handleChangePage(params.page + 1)} className="page-link">
                Next
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </LoadingScreen>
  );
}

export default Products;
