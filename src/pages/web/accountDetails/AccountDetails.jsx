import React, { useContext } from "react";
import { UserContext } from "../../../context/User";
import LoadingScreen from "../../../components/loadingScreen/LoadingScreen";
import { Link } from "react-router-dom";

function AccountDetails() {
  const { userInfo, isLoadingUser } = useContext(UserContext);
  if (isLoadingUser) {
    return "";
  }

  return (
    <>
      <div className="card-body d-flex align-items-center justify-content-between">
        <img
          className="img-account-profile rounded-circle border border-light-subtle mb-2"
          src={userInfo.image.secure_url}
          alt
        />
        <button className="btn btn-primary" type="button" disabled>
          Upload new image
        </button>
      </div>
      <form>
        <div className="accountInfo mb-3">
          <span className="d-inline-block" tabIndex={0} data-toggle="tooltip" title="Role">
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
    </>
  );
}

export default AccountDetails;
