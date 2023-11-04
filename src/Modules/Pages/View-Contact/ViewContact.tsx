import React, { useEffect } from 'react'
import Navbar from '../../Layout/Navbar';
import DisplayHeading from '../../Layout/DisplayHeading';
import { Link, useParams } from 'react-router-dom';
import Spinners from '../../Layout/Spinners';
import ErrorMessage from '../../Layout/ErrorMessage';
import * as contactReducer from "../../../Redux/Contacts/ContactsSlice"
import * as contactActions from "../../../Redux/Contacts/ContactsActions"
import {  RootState, useAppDispatch } from "../../../Redux/store";
import { useSelector } from "react-redux";

const ViewContact:React.FC = (props)=> {
  const dispatch:any = useAppDispatch();
    const {contactId} =useParams();
   /**
 * get the data from redux
 */
const contactState:contactReducer.InitialState = useSelector((store:RootState)=>{
  return store[contactReducer.contactFeatureKey];
})
const {loading,contact,group,error} = contactState;
    useEffect(()=>{
      if(contactId){
       dispatch(contactActions.getContactsAction({contactId:contactId}));
      }
    },[contactId]);
   
  return (
    <>
    {loading && <Spinners/>}
     <Navbar color={"bg-dark"} />
     {loading && Object.keys(error).length > 0 && <ErrorMessage/>}
      <DisplayHeading heading="View  Contacts" />
     {
      !loading && contact && group && Object.keys(contact).length > 0 && Object.keys(group).length > 0 &&
      <section className="mt-3">
      <div className="container">
        <div className="row mt-3 align-items-center">
          <div className="col-sm-3">
            <img
              alt=""
              className="img-fluid rounded-circle shadow-lg"
              style={{width: "250px", height: "250px"}}
              src={contact.imageUrl}/>
          </div>
          <div className="col-sm-8">
            <ul className="list-group">
              <li className="list-group-item">
                Name : <span className="fw-bold">{contact.name}</span>
              </li>
              <li className="list-group-item">
                Email : <span className="fw-bold">{contact.email}</span>
              </li>
              <li className="list-group-item">
                Mobile : <span className="fw-bold">{contact.mobile}</span>
              </li>
              <li className="list-group-item">
                Company : <span className="fw-bold">{contact.company}</span>
              </li>
              <li className="list-group-item">
                Title : <span className="fw-bold">{contact.title}</span>
              </li>
              <li className="list-group-item">
                Group:&nbsp;
                <span className="fw-bold">
                {group.data.name}
                </span>
              </li>
            </ul>
          </div>
          <div className="row mt-3">
            <div className="col text-center">
              <Link className="btn btn-warning" to="/contacts/admin">
                <i className="bi bi-arrow-left-circle-fill">Back</i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
     }
    </>
  )
};
export default ViewContact;
