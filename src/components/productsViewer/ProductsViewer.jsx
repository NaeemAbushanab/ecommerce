import React from "react";

import ProductCard from "../productCard/ProductCard";

function ProductsViewer({ data }) {
  return (
    <div className="d-flex flex-wrap gap-4">
      {data.map((product) => (
        <div key={product._id}>
          <ProductCard {...product} />
        </div>
      ))}
    </div>
  );
}

export default ProductsViewer;
