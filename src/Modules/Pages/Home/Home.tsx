import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../Redux/store";
import { userFeatureKey } from "../../../Redux/Users/UserSlice";
import { TokenUtil } from "../../../Util/TokenUtil";

export const Home: React.FC = () => {
  const userState = useSelector((state:RootState)=>{
    return state[userFeatureKey];
  });
  const {isAuthenticated} = userState;
  return (
    <>
      <div className="landing">
        <div className="wrapper">
          <div className="d-flex flex-column justify-content-center align-item-center text-center h-100">
            <h1 className="display-2">Contacts Manager App</h1>
            <div>
              {
                isAuthenticated && TokenUtil.isLoggedIn()?
<Link to={"/contacts/admin"}>
                <button className="btn btn-danger">Manage Contact</button>
              </Link>:<Link to={"/users/login"}>
                <button className="btn btn-warning ms-2">Login</button>
              </Link>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
