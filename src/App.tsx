import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./Modules/Layout/Navbar";
import NotFoundPage from "./Modules/Pages/PageNOTFound/PageNotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Modules/Pages/Home/Home";
import ContactAdmin from "./Modules/Pages/Contact-Admin/ContactAdmin";
import AddContact from "./Modules/Pages/Add-Contact/AddContact";
import EditContact from "./Modules/Pages/Edit-Contact/EditContact";
import ViewContact from "./Modules/Pages/View-Contact/ViewContact";
import { ToastContainer } from "react-toastify";
import LoginUser from "./Modules/Users/Pages/LoginUser";
import RegisterUser from "./Modules/Users/Pages/RegisterUser";
import { useAppDispatch } from "./Redux/store";
import { TokenUtil } from "./Util/TokenUtil";
import * as userActions from "./Redux/Users/UserAction"

const App: React.FC = () => {
  const dispatch:any = useAppDispatch();

  useEffect(()=>{
if(TokenUtil.isLoggedIn()){
  dispatch(userActions.getUserInfoAction());
}
  },[])
  return (
    <>
     <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/contacts/admin"} element={<ContactAdmin />} />
          <Route path={"contacts/add"} element={<AddContact />} />
          <Route path={"users/login"} element={<LoginUser/>} />
          <Route path={"users/Register"} element={<RegisterUser/>} />
          <Route path={"contacts/edit/:contactId"} element={<EditContact />} />
          <Route path={"contacts/view/:contactId"} element={<ViewContact />} />
          <Route path={"*"} element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
