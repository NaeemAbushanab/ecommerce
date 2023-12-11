import React, { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../../context/Order";
import "./Order.css";
import FloatingWindow from "../../../components/floatingWindow/FloatingWindow";
import LoadingScreen from "../../../components/loadingScreen/LoadingScreen";
import Input from "../../../components/input/Input";
import { ErrorToast } from "../../../components/toast/Toast";
import axios from "axios";
import { CartContext } from "../../../context/Cart";
import ProductsSwiper from "../../../components/productsSwiper/ProductsSwiper";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EmptyContainer from "../../../components/emptyContainer/EmptyContainer";
import { Link } from "react-router-dom";
function Order() {
  const { cartItems, isLoadingCart } = useContext(CartContext);
  const { notifyCartContext } = useContext(CartContext);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [displayFloatingWindow, setDisplayFloatingWindow] = useState(true);
  const handleSaveInfo = async (e) => {
    e.preventDefault();
    setDisplayFloatingWindow(false);
  };
  const handleChange = (e) => {
    if (e.target.name == "address") {
      setAddress(e.target.value);
    } else {
      setPhone(e.target.value);
    }
  };
  const orderNow = async (e) => {
    e.preventDefault();
    if (address == "" || phone == "") {
      ErrorToast("plase fill into inputs");
    } else {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/order`,
          { address, phone },
          {
            headers: { Authorization: `Tariq__${localStorage.getItem("userToken")}` },
          }
        );
        notifyCartContext();
        console.log(data);
      } catch (error) {
        ErrorToast(error.response.data.message);
      }
    }
  };
  const inputs = [
    {
      name: "address",
      id: "address",
      title: "Address",
      value: address,
      onChange: handleChange,
      type: "text",
    },
    {
      name: "phone",
      id: "phone",
      title: "phone",
      value: phone,
      onChange: handleChange,
      type: "number",
    },
  ];
  const RenderInputs = () => {
    return inputs.map((input, i) => {
      return <Input key={i} {...input} />;
    });
  };
  const addInfoToCompleteOrder = () => {
    if (displayFloatingWindow) {
      return (
        <FloatingWindow>
          <form onSubmit={handleSaveInfo} className="bg-white p-4 rounded-4">
            <h2 className="mb-4">
              Please enter info to continue to make <span className="text-primary">order</span>
            </h2>
            {RenderInputs()}
            <button className="btn btn-primary form-control mt-4">Save</button>
          </form>
        </FloatingWindow>
      );
    }
  };

  if (isLoadingCart) {
    return <LoadingScreen isLoading={true} />;
  }
  if (cartItems.length == 0) {
    return (
      <EmptyContainer
        title={
          <div className="text-center">
            <p>No products in cart please add products</p>
            <Link to={"/"} className="btn btn-primary">
              Go to Home page
            </Link>
          </div>
        }
      />
    );
  }
  let totalPrice = 0;
  const getCustomCartItems = () => {
    let Customitems = [];
    cartItems.map((item) => {
      Customitems.push({ ...item.details, quantity: item.quantity });
      totalPrice += item.details.price * item.quantity;
    });
    return Customitems;
  };
  return (
    <>
      {addInfoToCompleteOrder()}
      <h3 className="mb-3 border-0 border-bottom d-inline-block">Your Order</h3>
      <ProductsSwiper data={getCustomCartItems()} linkPath="Product" />
      <div className="d-flex flex-column align-items-start  ">
        <div className="d-flex  align-items-center">
          <div className="border-end p-2">
            <p>Address: {address}</p>
            <p>phone: {phone}</p>
          </div>
          <i
            className="ms-3"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setDisplayFloatingWindow(true);
            }}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </i>
        </div>
        <span className="my-3">
          Total price: <span className="text-primary">{totalPrice}$</span>
        </span>
      </div>
      <div>
        <button onClick={orderNow} className="btn btn-primary">
          Order now
        </button>
      </div>
    </>
  );
}

export default Order;
