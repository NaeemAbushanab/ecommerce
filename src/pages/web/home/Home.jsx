import React, { useContext, useState } from "react";
import { CartContext } from "../../../context/Cart";
import { UserContext } from "../../../context/User";
import LoadingScreen from "../../../components/loadingScreen/LoadingScreen";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import axios, { all } from "axios";
import { useQuery } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
function Home() {
  const { isLoadingCart } = useContext(CartContext);
  const { isLoadingUser } = useContext(UserContext);
  const [resSearch, setResSearch] = useState(null);
  const navigate = useNavigate();
  const handleOnChangeInputSeach = (_searchInput) => {
    if (_searchInput != "") {
      let res = [];
      allProduct.data.products.map((product) => {
        if (product.name.toLocaleLowerCase().includes(_searchInput.toLocaleLowerCase())) {
          res.push(product);
        }
      });
      if (res.length == 0) {
        setResSearch([{ name: "no results" }]);
      } else setResSearch(res);
    } else setResSearch(null);
  };
  const getAllProduct = async () => {
    return await axios
      .get(`${import.meta.env.VITE_API_URL}/products?page=1&limit=10&fields=name`)
      .then(({ data }) => {
        return data;
      });
  };
  const allProduct = useQuery("allProducts", getAllProduct);
  if (allProduct.isLoading || (!isLoadingUser && isLoadingCart)) {
    return <LoadingScreen />;
  }
  return (
    <div className="home">
      <form className="">
        <div className="w-75 m-auto position-relative">
          <input
            className="form-control rounded-pill searchInput"
            id="listSearch"
            type="text"
            placeholder="Search"
            onChange={(e) => handleOnChangeInputSeach(e.target.value)}
          />
          <i
            className="cancel position-absolute end-0 top-50 translate-middle rounded-circle"
            onClick={() => {
              document.querySelector(".searchInput").value = "";
              handleOnChangeInputSeach("");
            }}
          >
            <FontAwesomeIcon icon={faX} />
          </i>
        </div>
        <ul className="list-group w-75 m-auto mt-2 " id="myList">
          {resSearch != null &&
            resSearch.map((res, i) => {
              if (res.name == "no results") {
                return (
                  <li key={i} className="list-group-item">
                    {res.name}
                  </li>
                );
              }
              return (
                <li
                  key={i}
                  className="list-group-item"
                  onClick={() => {
                    navigate(`/product/${res._id}`);
                  }}
                >
                  {res.name}
                </li>
              );
            })}
        </ul>
      </form>
    </div>
  );
}

export default Home;
