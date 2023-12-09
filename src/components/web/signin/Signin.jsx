import React, { useContext } from "react";
import Input from "../../shared/Input";
import { useFormik } from "formik";
import { signinSchema } from "../validation/auth";
import axios from "axios";
import { ErrorToast, SuccessToast, WarningToast } from "../../shared/Toast";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/User";
import { CartContext } from "../context/Cart";
function Signin({}) {
  const initialValues = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  const { notifyUserContext } = useContext(UserContext);
  const { notifyCartContext } = useContext(CartContext);
  const onSubmit = (user) => {
    axios
      .post(`https://ecommerce-node4.vercel.app/auth/signin`, user)
      .then(({ data }) => {
        if (data.message == "success") {
          localStorage.setItem("userToken", data.token);
          notifyUserContext(data.token);
          notifyCartContext(data.token);
          SuccessToast("log in sucessfully");
          navigate("/");
        } else {
          WarningToast(data.message);
        }
      })
      .catch((error) => {
        ErrorToast(error);
      });
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: signinSchema,
  });
  const inputs = [
    { id: "email", name: "email", type: "email", title: "Email", value: formik.values.email },
    {
      id: "password",
      name: "password",
      type: "password",
      title: "Password",
      value: formik.values.password,
    },
  ];
  const renderInput = () =>
    inputs.map((input, index) => {
      return (
        <Input
          key={index}
          {...input}
          onChange={formik.handleChange}
          errors={formik.errors}
          onBlur={formik.handleBlur}
          touched={formik.touched}
        />
      );
    });

  return (
    <div className="my-4">
      <h2>Sign in</h2>
      <form className="form" onSubmit={formik.handleSubmit}>
        {renderInput()}
        <div className="text-center">
          <button type="submit" className="form-control btn btn-primary" disabled={!formik.isValid}>
            Sign in
          </button>
        </div>
      </form>
      <div className="d-flex mt-4 column-gap-5">
        <div>
          <Link to={"/sendCode"} className="text-reset">
            Forgot password?
          </Link>
        </div>
        <div>
          <Link to={"/register"} className="text-reset">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signin;
