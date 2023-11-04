import { combineReducers } from "@reduxjs/toolkit";
import * as contactReducer from "./Contacts/ContactsSlice"
import * as userReducer from "./Users/UserSlice"


const rootReducer = combineReducers({
    [contactReducer.contactFeatureKey]:contactReducer.contactSlice.reducer,
    [userReducer.userFeatureKey]:userReducer.userSlice.reducer

});
export default rootReducer;
