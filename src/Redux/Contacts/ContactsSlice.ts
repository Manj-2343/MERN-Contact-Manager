import {
  SerializedError,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { IContactsView } from "../../Modules/Models/IContactsView";
import { IGroupsView } from "../../Modules/Models/IGroupsView";
import * as contactActions from "../Contacts/ContactsActions";
import { ToastUtil } from "../../Util/ToastUtil";

export const contactFeatureKey = "contactFeature";

export interface InitialState {
  loading: boolean;
  error: SerializedError;
  contacts: IContactsView[];
  contact: IContactsView;
  groups: IGroupsView[];
  group: IGroupsView;
}

const initialState: InitialState = {
  loading: false,
  error: {} as SerializedError,
  contacts: [] as IContactsView[],
  contact: {} as IContactsView,
  groups: [] as IGroupsView[],
  group: {} as IGroupsView,
};

export const contactSlice = createSlice({
  name: "contactSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //getAllContactsAction
    builder
      .addCase(contactActions.getAllContactsAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        contactActions.getAllContactsAction.fulfilled,
        (state, action) => {
          state.loading = false;
          state.contacts = action.payload.data;
        }
      )
      .addCase(
        contactActions.getAllContactsAction.rejected,
        (state, action) => {
          state.loading = false;
          ToastUtil.displayErrorToast("unable to get contacts from server");
          if (isRejectedWithValue(action)) {
            state.error = action.error;
          }
        }
      );
    //getContactsAction
    builder
      .addCase(contactActions.getContactsAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        contactActions.getContactsAction.fulfilled,
        (state, action) => {
          state.loading = false;
          state.contact = action.payload.data;
        }
      )
      .addCase(
        contactActions.getContactsAction.rejected,
        (state, action) => {
          state.loading = false;
          ToastUtil.displayErrorToast("unable to get contact from server");
          if (isRejectedWithValue(action)) {
            state.error = action.error;
          }
        }
      );
      //createContact
      builder
      .addCase(contactActions.createContactsAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        contactActions.createContactsAction.fulfilled,
        (state, action) => {
          state.loading = false;
          ToastUtil.displaySuccessToast("Contact Creation is Success");
        }
      )
      .addCase(
        contactActions.createContactsAction.rejected,
        (state, action) => {
          state.loading = false;
          ToastUtil.displayErrorToast("Contact Creation is Failed");
          if (isRejectedWithValue(action)) {
            state.error = action.error;
          }
        }
      );
      //updateContactActions
      builder
      .addCase(contactActions.updateContactAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        contactActions.updateContactAction.fulfilled,
        (state, action) => {
          state.loading = false;
          ToastUtil.displaySuccessToast("Contact Update  is Success");
        }
      )
      .addCase(
        contactActions.updateContactAction.rejected,
        (state, action) =>{
          state.loading = false;
          ToastUtil.displayErrorToast("Contact update is Failed");
          if (isRejectedWithValue(action)) {
            state.error = action.error;
          }
        }
      );
      //DeleteContactActions
      builder
      .addCase(contactActions.deleteContactAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        contactActions.deleteContactAction.fulfilled,
        (state, action) => {
          state.loading = false;
          ToastUtil.displayInfoToast("Contact  deleted successfully");
        }
      )
      .addCase(
        contactActions.deleteContactAction.rejected,
        (state, action) =>{
          state.loading = false;
          ToastUtil.displayErrorToast("Contact deleted Failed");
          if (isRejectedWithValue(action)) {
            state.error = action.error;
          }
        }
      );
      //getAllGroupsAction
      builder
      .addCase(contactActions.getAllGroupsAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        contactActions.getAllGroupsAction.fulfilled,
        (state, action) => {
          state.loading = false;
         state.groups = action.payload.data;
        }
      )
      .addCase(
        contactActions.getAllGroupsAction.rejected,
        (state, action) =>{
          state.loading = false;
          if (isRejectedWithValue(action)) {
            state.error = action.error;
          }
        }
      );
      //getGroupAction
      builder
      .addCase(contactActions.getGroupAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        contactActions.getGroupAction.fulfilled,
        (state, action) => {
          state.loading = false;
         state.group = action.payload;
        }
      )
      .addCase(
        contactActions.getGroupAction.rejected,
        (state, action) =>{
          state.loading = false;
          if (isRejectedWithValue(action)) {
            state.error = action.error;
          }
        }
      );
  },
});
