
import React, { useState } from 'react'
import Navbar from '../../Layout/Navbar';
import DisplayHeading from '../../Layout/DisplayHeading';
import { Link, useNavigate } from 'react-router-dom';
import { IUserView } from '../Models/IUserView';
import * as UserActions from "../../../Redux/Users/UserAction"
import {  useAppDispatch } from '../../../Redux/store';


 const LoginUser:React.FC=()=> {
  const navigate =useNavigate();
  const dispatch:any=useAppDispatch();
  const [user,setUser] = useState<IUserView>({
    email:"",
    password:""
  });

  const updateInput=(event:React.ChangeEvent<HTMLInputElement>)=>{
  setUser({
    ...user,
    [event.target.name]:event.target.value
  })
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await dispatch(UserActions.loginUserAction({ user: user }));
      console.log('Response:', response);
      if (!response.error) {
        navigate("/contacts/admin");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <>
    <Navbar color={"bg-dark"} />
    <DisplayHeading heading="Login Here" />
    <div className='container'>
      <div className='row'>
        <div className='col-sm-4'>
        <form onSubmit={e=>handleSubmit(e)}>
            <div className='mb-2'>
              <input
              name={"email"}
              onChange={e=>updateInput(e)}
              value={user.email}
              type="email" className='form-control' required placeholder='Email'/>
            </div>
            <div className='mb-2'>
              <input 
              name={"password"}
              onChange={e=>updateInput(e)}
              value={user.password}
              type="password" className='form-control' required placeholder='Password'/>
            </div>
            <div className='mb-2'>
              <input type="submit" className='btn btn-success' value='Login'/>
             <Link to={"/"} className='btn btn-dark ms-2'>Cancel</Link>
            </div>
          </form>
          <small>Don't Have An Account?</small>
          <Link to={"/users/register"} className='fw-bold'> Register</Link>
        </div>
      </div>
    </div>
    </>
  )
} 
export default LoginUser;





