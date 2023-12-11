import React from "react";

import ProductCard from "../productCard/ProductCard";

function ProductsViewer({ data }) {
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

export default ProductsViewer;
