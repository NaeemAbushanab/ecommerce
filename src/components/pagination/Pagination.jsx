import React from "react";
import { Link } from "react-router-dom";

function Pagination({ params, totalPages, setData }) {
  const handleChangePage = (i) => {
    if (params.page != i) {
      setData({
        ...params,
        page: Number(i),
      });
    }
  };
  return (
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
  );
}

export default Pagination;
