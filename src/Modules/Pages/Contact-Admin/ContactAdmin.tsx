import React, { useEffect, useState } from "react";
import Navbar from "../../Layout/Navbar";
import DisplayHeading from "../../Layout/DisplayHeading";
import { Link } from "react-router-dom";
import { IContactsView} from "../../Models/IContactsView";

import Spinners from "../../Layout/Spinners";
import ErrorMessage from "../../Layout/ErrorMessage";
import ContactCard from "../../Components/ContactCard";

import * as contactReducer from "../../../Redux/Contacts/ContactsSlice"
import * as contactActions from "../../../Redux/Contacts/ContactsActions"
import {  RootState, useAppDispatch } from "../../../Redux/store";
import { useSelector } from "react-redux";


const ContactAdmin: React.FC = () => {
  const dispatch:any = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState<string>("");
/**
 * get the data from redux
 */
const contactState:contactReducer.InitialState = useSelector((store:RootState)=>{
  return store[contactReducer.contactFeatureKey];
})

  useEffect(() => {
    dispatch(contactActions.getAllContactsAction({}));
  }, []);
  const { loading, contacts, error } = contactState;
  const makeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase().trim();
    setSearchQuery(query);
    //Todo
  };
  const clickDeleteContact = (contactId: string | undefined): void => {
    if(contactId){
      dispatch(contactActions.deleteContactAction({contactId:contactId}))
    }
  };
  return (
    <>
      {loading && <Spinners />}
      <Navbar color={"bg-dark"} />
      {loading && Object.keys(error).length > 0 && <ErrorMessage />}
      <DisplayHeading heading="Manage Contacts" />
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <form>
              <div className="row">
                <div className="col">
                  <input
                    value={searchQuery}
                    onChange={(e) => makeSearch(e)}
                    className="form-control"
                    placeholder="Search Here"
                    type="text"
                  />
                </div>
                <div className="col">
                  <input className="btn btn-dark me-2" type="submit" />
                  <Link className="btn btn-success" to={"/contacts/add"}>
                    <i className="bi bi-plus-circle-fill"></i>New
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {contacts.length > 0 ? (  //contacts?.length=null-checker
        <section className="mt-3" style={{ margin: "40px" }}>
          <div className="container">
            <div className="row">
              {contacts.map((contact, index) => {
                return (
                  <div className="col-sm-6 mt-3" key={contact._id}>
                    {contact && (
                      <ContactCard
                        contact={contact}
                        clickDeleteContact={clickDeleteContact}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : (
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <p className="h4 text-danger">No Contacts Found</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ContactAdmin;
