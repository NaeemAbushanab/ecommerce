import React, { useContext } from "react";
import { OrderContext } from "../../../context/Order";
import LoadingScreen from "../../../components/loadingScreen/LoadingScreen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Orders() {
  const { data, isLoading } = useContext(OrderContext);
  if (isLoading) {
    return <LoadingScreen isLoading={true} />;
  }
  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Order date</th>
            <th scope="col">Toatal Price</th>
            <th scope="col">Status</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((order, i) => {
            let date = new Date(order.createdAt);
            return (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`}</td>
                <td>{order.finalPrice}$</td>
                <td className="text-warning">{order.status}</td>
                <td style={{ cursor: "pointer" }} onClick={() => console.log(order)}>
                  <i>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
