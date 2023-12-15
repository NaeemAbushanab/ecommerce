import React from "react";
import Input from "../input/Input";
import { WarningToast } from "../toast/Toast";

function FilterProducts({ params, setParams, setData, totalPages, sortOptions, initialParams }) {
  sortOptions = ["default", "price", "-price", "name", "-name", "discount", "-discount"];
  const handleChangeFilterDataByPrice = (e) => {
    const value = e.target.value;
    if (value != "") setParams({ ...params, [e.target.name]: value });
    else setParams({ ...params, [e.target.name]: "" });
  };
  const handleOnSubmitFilterByPrice = async (e) => {
    e.preventDefault();
    let gte = params["price[gte]"];
    let lte = params["price[lte]"];
    if (gte < 0 || lte < 0) {
      WarningToast("can't accept filter by price less than 1");
    } else if (gte > lte && lte != "" && gte != "") {
      WarningToast("min price is greater then max price");
    } else
      setData({
        ...params,
        "price[gte]": gte,
        "price[lte]": lte,
      });
  };
  const handleChangeSelectDisplayInput = (e) => {
    setData({
      ...params,
      page: 1,
      limit: Number(e.target.value),
    });
  };
  const handleChangeSelectSortInput = (e) => {
    let sortOption = e.target.value;
    if (sortOption == "default") sortOption = "";
    setData({ ...params, sort: sortOption });
  };
  const handleChangeSearchInput = (e) => {
    setParams({
      ...params,
      search: e.target.value,
    });
  };
  return (
    <div className="mb-5 filterData d-flex align-items-center column-gap-4">
      <div className="text-center">
        <label>Display</label>
        <select
          onChange={handleChangeSelectDisplayInput}
          value={params.limit}
          className="form-select"
          style={{ width: "unset" }}
        >
          {[...Array(totalPages)].map((_, i) => {
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
          onChange={handleChangeSelectSortInput}
          value={params.sort}
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
      <form onSubmit={handleOnSubmitFilterByPrice} className="filterByPrice d-flex align-items-end">
        <Input
          customStyleDivFather={"text-center mb-0 w-25 me-2"}
          title={"min price"}
          value={params["price[gte]"]}
          name={"price[gte]"}
          placeholder={"min"}
          onChange={handleChangeFilterDataByPrice}
          type="number"
        />
        <Input
          customStyleDivFather={"text-center mb-0 w-25"}
          title={"max price"}
          name={"price[lte]"}
          value={params["price[lte]"]}
          placeholder={"max"}
          onChange={handleChangeFilterDataByPrice}
          type="number"
        />
        <button type="submit" className="btn btn-primary ms-1">
          Go
        </button>
        <button
          className="btn btn-primary ms-5"
          onClick={(e) => {
            e.preventDefault();
            setData(initialParams);
          }}
        >
          Reset all inputs
        </button>
      </form>
      <form className="d-flex align-items-end" onSubmit={() => setData(params)}>
        <Input
          value={params.search}
          name={"search"}
          placeholder={"Search"}
          onChange={handleChangeSearchInput}
        />
        <button className="btn btn-outline-primary ms-2" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default FilterProducts;
