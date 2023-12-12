import React, { useContext } from "react";
import "./Profile.css";
import { Link, Outlet } from "react-router-dom";
import LoadingScreen from "../../../components/loadingScreen/LoadingScreen";
import { UserContext } from "../../../context/User";
function Profile() {
  const { isLoadingUser } = useContext(UserContext);
  return (
    <LoadingScreen isLoading={isLoadingUser}>
      <div className="profile py-5">
        <div className="container-xl ">
          <div className="row">
            <div className="col-xl-4">
              <div className="card mb-4 mb-xl-0">
                <div className="card-header">Group Profile Info</div>
                <div className="list-group p-1">
                  <Link to={""} className="list-group-item list-group-item-action">
                    Account Details
                  </Link>
                  <Link to={"orders"} className="list-group-item list-group-item-action">
                    Orders
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="card mb-4">
                <div className="card-header">Account Details</div>
                <div className="card-body">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LoadingScreen>
  );
}
export default Profile;
