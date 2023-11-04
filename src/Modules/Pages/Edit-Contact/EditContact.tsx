import React, { useEffect, useState } from 'react'
import Navbar from '../../Layout/Navbar';
import DisplayHeading from '../../Layout/DisplayHeading';
import { Link, useParams } from 'react-router-dom';
import { IContactsView } from '../../Models/IContactsView';
import Spinners from '../../Layout/Spinners';
import ErrorMessage from '../../Layout/ErrorMessage';
import {useNavigate} from "react-router-dom"
import { RootState, useAppDispatch } from '../../../Redux/store';
import * as contactReducer from "../../../Redux/Contacts/ContactsSlice"
import * as contactActions from "../../../Redux/Contacts/ContactsActions"
import { useSelector } from 'react-redux';



const EditContact: React.FC = () => {
  const dispatch: any = useAppDispatch();
  const navigate = useNavigate();
  const { contactId } = useParams();
/**
 * get the data from redux
 */
  const contactState: contactReducer.InitialState = useSelector((store: RootState) => {
    return store[contactReducer.contactFeatureKey];
  });
  const { loading, contact: contactRedux, groups,  error } = contactState;
  console.log(groups);
  const [contact, setContact] = useState<IContactsView>({
    name: '',
    imageUrl: '',
    mobile: '',
    email: '',
    company: '',
    title: '',
    groupId: '',
  });
/**
 * when the page is loaded ,get all  groups for dropdown
 */
  useEffect(() => {
    dispatch(contactActions.getAllContactsAction({}));
  }, []);
/**
 * when the contactId ,then get the contact From server
 */
  useEffect(() => {
    if (contactId) {
      dispatch(contactActions.getContactsAction({ contactId: contactId }));
    }
  }, [contactId]);
  /**
   * if changes in the contact Redux ,populate the data
   */
  useEffect(()=>{
    if(contactRedux && Object.keys(contactRedux).length > 0) {
setContact({
  ...contact,
  name:contactRedux.name ? contactRedux.name:"" ,
  imageUrl:contactRedux.imageUrl ? contactRedux.imageUrl:"",
  mobile:contactRedux.mobile ? contactRedux.mobile:"",
  email:contactRedux.email ? contactRedux.email:"",
  company:contactRedux.company ? contactRedux.company:"",
  title: contactRedux.title ? contactRedux.title:"",
})
    }
  },[contactRedux]);
  useEffect(() => {
    dispatch(contactActions.getAllGroupsAction({}));
  }, []);
/**
 * 
 * when the form felid data changes, update the local state
 */
  const updateInput = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setContact({
      ...contact,
      [event.target.name]: event.target.value,
    });
  };

  // Form submit for update
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (contactId) {
      dispatch(contactActions.updateContactAction({contact:contact,contactId:contactId})).then((response:any)=>{
        if(!response.error){
          navigate('/contacts/admin');
        }
       });
    }
  };

  return (
    <> 
     {loading && <Spinners/>}
    <Navbar color={"bg-dark"} />
    <DisplayHeading heading="Update Contacts" />
    {!loading && Object.keys(error).length>0 && <ErrorMessage/>}
    {/* <pre>{JSON.stringify(contact)}</pre>
    <pre>{JSON.stringify(groups)}</pre> */}
      <div className='container'>
      <div className="row">
        <div className="col-sm-4">
        <form onSubmit={e=>handleSubmit(e)}>
            <div className="mb-2">
                <input
                value={contact.name}
                onChange={e=>updateInput(e)}
                required={true}
                 name={'name'}
                 className="form-control"
                 placeholder="Name"
                 type="text"/>

            </div>
            <div className="mb-2">
                <input 
                value={contact.imageUrl}
                onChange={e=>updateInput(e)}
                required={true}
                name={'imageUrl'}
                className="form-control"
                 placeholder="Image Url" 
                 type="text"/>

            </div>
            <div className="mb-2">
                <input 
                value={contact.mobile}
                onChange={e=>updateInput(e)}
                required={true}
                name={'mobile'}
                className="form-control"
                 placeholder="Mobile" 
                 type="number"/>

            </div>
            <div className="mb-2">
                <input 
                value={contact.email}
                onChange={e=>updateInput(e)}
                required={true}
                name={'email'}
                className="form-control" 
                placeholder="Email" 
                type="email"/>
            </div>
            <div className="mb-2">
                <input 
                value={contact.company}
                onChange={e=>updateInput(e)}
                required={true}
                name={'company'}
                className="form-control" 
                placeholder="Company" 
                type="text"/>
            </div>
            <div className="mb-2">
                <input 
                value={contact.title}
                onChange={e=>updateInput(e)}
                required={true}
                name={'title'}
                className="form-control" 
                placeholder="Title" 
                type="text"/>
            </div>
            <div className="mb-3">
                <select 
                required={true}
                name={'groupId'}
                value={contact.groupId}
                onChange={e=>updateInput(e)}
                className="form-control">
                    <option value="">Select A Group</option>
                    {
                      groups.map((group,index)=>{
                        return(
                          <option key={index} value={group._id}>{group.name}</option>
                        )
                      })
                    }
                </select>
            </div>
            <div className="mb-2">
                <input className="btn btn-primary me-2" type="submit" value="Update"/>
                <Link className="btn btn-danger" to="/contacts/admin">Cancel</Link>
            </div>
            </form>
        </div>
        <div className="col-sm-4">
          {
            contact && contact.imageUrl &&
            <img 
            src={contact.imageUrl} alt="" 
            className="img-fluid rounded-circle shadow-lg"
            style={{width: "320px", height: "320px"}} />
          }
        
        </div>
      </div>
      </div></>
  )
};
export default EditContact;
