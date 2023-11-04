import { createAsyncThunk } from "@reduxjs/toolkit";
import { IContactsView } from "../../Modules/Models/IContactsView";
import { ContactService } from "../../Modules/Services/ContactServices";
import { IGroupsView } from "../../Modules/Models/IGroupsView";
import { AuthUtil } from "../../Util/AuthenticationUtil";

/**
 * to get all contacts
 */
export const getAllContactsAction = createAsyncThunk(
  "contacts/getAllContactsAction",
  async (payload: {}, { rejectWithValue }):Promise<IContactsView[] | any> => {
    try {
      if(AuthUtil.issetTokenToRequestHeaders()){
        const response = await ContactService.getAllContacts();
      return response.data;
      }//private
    } catch (error:any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
/**
 * get a single Contact 
 */
export const getContactsAction = createAsyncThunk(
    "contacts/getContactsAction",
    async (payload: {contactId:string}, { rejectWithValue,dispatch }):Promise<IContactsView |any> => {
      try {
        const {contactId} = payload;
        if(AuthUtil.issetTokenToRequestHeaders()){
          const response = await ContactService.getContact(contactId);
          if(response && response.data){
              dispatch(getGroupAction({ contact: response.data })); //get the  group information when we gat the contact object
          }
          return response.data;
        }
      } catch (error:any) {
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error.response.data);
      }
    }
  );
/**
 * Create the  contact
 */
export const createContactsAction = createAsyncThunk(
    "contacts/createContactsAction",
    async (payload: {contact: IContactsView}, { rejectWithValue }):Promise<IContactsView |any> => {
      try {
        const {contact} = payload;
        if(AuthUtil.issetTokenToRequestHeaders()){
          const response = await ContactService.createContact(contact);
        return response.data;
        }
      } catch (error:any) {
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error.response.data);
      }
    }
  );
  /**
   * Update Contact
   */
  export const updateContactAction = createAsyncThunk(
    "contacts/updateContactAction",
    async (payload: { contactId: string, contact: IContactsView }, { rejectWithValue }):Promise<IContactsView |any> => {
      try {
        const { contactId, contact } = payload;
        if(AuthUtil.issetTokenToRequestHeaders()){
          const response = await ContactService.updateContact( contactId,contact);
          return response.data;
        }
      } catch (error: any) {
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error.response.data);
      }
    }
  );
  /**
   * Delete Contact
   */
  export const deleteContactAction = createAsyncThunk(
    "contacts/deleteContactAction",
    async (payload: { contactId: string }, { rejectWithValue ,dispatch}):Promise<{} |any> => {
      try {
        const { contactId } = payload;
        if(AuthUtil.issetTokenToRequestHeaders()){
          const response = await ContactService.deleteContact( contactId);
        if(response && response.data){
            dispatch(getAllContactsAction({}));//get the fresh data when the delete was success
        }
        return response.data;
        }
      } catch (error: any) {
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error.response.data);
      }
    }
  );
  /**
   * Get All Groups
   */
  export const getAllGroupsAction = createAsyncThunk(
    "contacts/getAllGroupsAction",
    async (payload: {}, { rejectWithValue, dispatch }):Promise<IGroupsView[] |any> => {
      try {
        if(AuthUtil.issetTokenToRequestHeaders()){
          const response = await ContactService.getAllGroups();
          return response.data;
        }
      } catch (error: any) {
        if (!error.response) {
          dispatch(someErrorAction()); // Dispatch an error action if needed
          throw error;
        }
        return rejectWithValue(error.response.data);
      }
    }
  );
  /**
   *  Get a Group
   */
  export const getGroupAction = createAsyncThunk(
    "contacts/getGroupAction",
   
    async (payload: {contact: IContactsView}, { rejectWithValue }):Promise<IGroupsView |any> => {
      try {
        const {contact} = payload
        if(AuthUtil.issetTokenToRequestHeaders()){
          const response = await ContactService.getGroup(contact);
          return response.data;
        }
      } catch (error: any) {
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error.response.data);
      }
    }
  );

function someErrorAction(): any {
  throw new Error("Function not implemented.");
}
  