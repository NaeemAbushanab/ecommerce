import React from "react";
import { useContext } from "react";
import { UserContext } from "../context/User";
import LoadingScreen from "../../shared/loadingScreen/LoadingScreen";
import "./Profile.css";
import { Link } from "react-router-dom";
function Profile() {
  const { userInfo } = useContext(UserContext);
  if (userInfo == null) {
    return <LoadingScreen />;
  }
  return (
    <div className="profile py-5">
      <div className="container-xl ">
        <div className="row">
          <div className="col-xl-4">
            <div className="card mb-4 mb-xl-0">
              <div className="card-header">Profile Picture</div>
              <div className="card-body text-center">
                <img
                  className="img-account-profile rounded-circle mb-2"
                  src={userInfo.image.secure_url}
                  alt
                />
                <button className="btn btn-primary" type="button" disabled>
                  Upload new image
                </button>
              </div>
            </div>
          </div>
          <div className="col-xl-8">
            <div className="card mb-4">
              <div className="card-header">Account Details</div>
              <div className="card-body">
                <form>
                  <div className="accountInfo mb-3">
                    <span
                      className="d-inline-block"
                      tabIndex={0}
                      data-toggle="tooltip"
                      title="Role"
                    >
                      <button
                        className="btn btn-primary"
                        style={{ pointerEvents: "none" }}
                        type="button"
                        disabled
                      >
                        {userInfo.role}
                      </button>
                    </span>
                  </div>
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputUsername">
                      Username
                    </label>
                    <input
                      disabled
                      className="form-control"
                      id="userName"
                      type="text"
                      placeholder="Enter your username"
                      defaultValue={userInfo.userName}
                    />
                  </div>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputFirstName">
                        First name
                      </label>
                      <input
                        disabled
                        className="form-control"
                        id="inputFirstName"
                        type="text"
                        placeholder=""
                        defaultValue=""
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputLastName">
                        Last name
                      </label>
                      <input
                        className="form-control"
                        id="inputLastName"
                        type="text"
                        placeholder=""
                        defaultValue=""
                        disabled
                      />
                    </div>
                  </div>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6 email-form">
                      <label className="small mb-1" htmlFor="inputEmailAddress">
                        Email address
                        {userInfo.confirmEmail === true ? (
                          <span className="verified ms-2">Verified</span>
                        ) : (
                          ""
                        )}
                      </label>
                      <input
                        className="form-control"
                        id="inputEmailAddress"
                        type="email"
                        placeholder=""
                        defaultValue={userInfo.email}
                        disabled
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputLocation">
                        Location
                      </label>
                      <input
                        className="form-control"
                        id="inputLocation"
                        type="text"
                        placeholder=""
                        defaultValue=""
                        disabled
                      />
                    </div>
                  </div>
                  <div className="mb-3"></div>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputPhone">
                        Phone number
                      </label>
                      <input
                        className="form-control"
                        id="inputPhone"
                        type="tel"
                        placeholder=""
                        defaultValue=""
                        disabled
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputBirthday">
                        Birthday
                      </label>
                      <input
                        className="form-control"
                        id="inputBirthday"
                        type="text"
                        name="birthday"
                        placeholder=""
                        defaultValue=""
                        disabled
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-primary" type="button" disabled>
                      Save changes
                    </button>
                    <Link className="btn btn-primary" type="button" to={"/sendCode"}>
                      Changes Password
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
