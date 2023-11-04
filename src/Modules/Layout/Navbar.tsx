import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userFeatureKey } from '../../Redux/Users/UserSlice';
import { RootState, useAppDispatch } from '../../Redux/store';
import { TokenUtil } from '../../Util/TokenUtil';
import * as userReducer from "../../Redux/Users/UserSlice"

interface IProps{
  color:string,
  heading?:string
}

const Navbar:React.FC<IProps> =(props)=> {
  const dispatch:any = useAppDispatch();
  const userState = useSelector((state:RootState)=>{
    return state[userFeatureKey];
  });
  const {isAuthenticated,user} = userState;
  const clickLogOut=()=>{
dispatch({
  type:`${userReducer.logOutActions}`
})
  };
  return (
    <>
    <nav className={`navbar navbar-expand-lg  ${props.color}  `}>
    <div className='container-fluid ms-5'>
      <Link to="/" className="navbar-brand text-white" >
        <i className='bi bi-phone-fill'></i>
        Contacts <span className='text-warning'>Manager</span></Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          <li className="nav-item ">
          <Link to={"/"} className="nav-link text-white">Home</Link>
          </li>
          <li className="nav-item">
          <Link to={"/contacts/admin"} className="nav-link text-white">Contacts</Link>
          </li>
        </ul>
        <div className='d-flex'>
        <ul className="navbar-nav">
          {
            user && Object.keys(user).length > 0 &&<li className="nav-item ">
              <span className="nav-link text-white">
                <img src={user.imageUrl} alt="" width={25} height={25} className='rounded-circle'/>
                {user.username}</span>
            </li>
          }
          {
            !isAuthenticated && !TokenUtil.isLoggedIn()?<li className="nav-item ">
            <Link to={"/users/login"} className="nav-link text-white">Login</Link>
            </li>: <li className="nav-item">
          <Link to={"/"} className="nav-link text-white"  onClick={clickLogOut}>
            <i className='bi bi-power'></i></Link>
          </li>
          }
        </ul>
        </div>
      </div>
      </div>
    </nav>
    
    </>
  )
};
export default Navbar;
