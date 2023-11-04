import React, { useEffect, useState } from "react";
import Navbar from "../../Layout/Navbar";
import DisplayHeading from "../../Layout/DisplayHeading";
import { Link } from "react-router-dom";
import { IContactsView } from "../../Models/IContactsView";
import Spinners from "../../Layout/Spinners";
import ErrorMessage from "../../Layout/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "../../../Redux/store";
import * as contactReducer from "../../../Redux/Contacts/ContactsSlice";
import * as contactActions from "../../../Redux/Contacts/ContactsActions";
import { useSelector } from "react-redux";

const AddContact: React.FC = () => {
  const dispatch: any = useAppDispatch();
  const navigate = useNavigate();

  /**
   * get the data from redux
   */
  const contactState: contactReducer.InitialState = useSelector(
    (store: RootState) => {
      return store[contactReducer.contactFeatureKey];
    }
  );
  const { loading, groups, error } = contactState;
  const [contact, setContact] = useState<IContactsView>({
    name: "",
    imageUrl: "",
    mobile: "",
    email: "",
    company: "",
    title: "",
    groupId: "",
  });

  useEffect(() => {
    dispatch(contactActions.getAllGroupsAction({}));
  }, []);
  console.log(groups);
  const updateInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    // const {name,value} = event.target;
    setContact({ ...contact, [event.target.name]: event.target.value });
  };

  const renderGroupOptions = () => {
    if (loading) {
      return <option disabled>Loading...</option>;
    } else if (groups.length > 0) {
      return groups.map((group, index) => (
        <option key={index} value={group._id}>
          {group.name}
        </option>
      ));
    }
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(contactActions.createContactsAction({ contact: contact })).then(
      (response: any) => {
        if (!response.error) {
          navigate("/contacts/admin");
        }
      }
    );
  };



  return (
    <>
      {loading && <Spinners />}
      <Navbar color={"bg-dark"} />
      <DisplayHeading heading="Add Contacts" />
      {!loading && Object.keys(error).length > 0 && <ErrorMessage />}
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="mb-2">
                <input
                  value={contact.name}
                  onChange={(e) => updateInput(e)}
                  required={true}
                  name={"name"}
                  className="form-control"
                  placeholder="Name"
                  type="text"
                />
              </div>
              <div className="mb-2">
                <input
                  value={contact.imageUrl}
                  onChange={(e) => updateInput(e)}
                  required={true}
                  name={"imageUrl"}
                  className="form-control"
                  placeholder="Image Url"
                  type="text"
                />
              </div>
              <div className="mb-2">
                <input
                  value={contact.mobile}
                  onChange={(e) => updateInput(e)}
                  required={true}
                  name={"mobile"}
                  className="form-control"
                  placeholder="Mobile"
                  type="number"
                />
              </div>
              <div className="mb-2">
                <input
                  value={contact.email}
                  onChange={(e) => updateInput(e)}
                  required={true}
                  name={"email"}
                  className="form-control"
                  placeholder="Email"
                  type="email"
                />
              </div>
              <div className="mb-2">
                <input
                  value={contact.company}
                  onChange={(e) => updateInput(e)}
                  required={true}
                  name={"company"}
                  className="form-control"
                  placeholder="Company"
                  type="text"
                />
              </div>
              <div className="mb-2">
                <input
                  value={contact.title}
                  onChange={(e) => updateInput(e)}
                  required={true}
                  name={"title"}
                  className="form-control"
                  placeholder="Title"
                  type="text"
                />
              </div>
              <div className="mb-3">
              <select
                  required={true}
                  name={"groupId"}
                  value={contact.groupId}
                  onChange={(e) => updateInput(e)}
                  className="form-control"
                >
                  <option value="">Select A Group</option>
                  {renderGroupOptions()}
                </select>
              </div>
              <div className="mb-2">
                <input
                  className="btn btn-success me-2"
                  type="submit"
                  value="Create"
                />
                <Link className="btn btn-danger" to="/contacts/admin">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
          <div className="col-sm-4">
            {contact && contact.imageUrl && (
              <img
                src={contact.imageUrl}
                alt=""
                className="img-fluid rounded-circle shadow-lg"
                style={{ width: "320px", height: "320px" }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default AddContact;
