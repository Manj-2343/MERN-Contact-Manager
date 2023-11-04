import { SerializedError, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import { IUserView } from "../../Modules/Users/Models/IUserView";
import * as UserActions from "../Users/UserAction"
import { ToastUtil } from "../../Util/ToastUtil";
import { TokenUtil } from "../../Util/TokenUtil";

export const userFeatureKey = "userFeature";
export interface InitialState {
    loading: boolean;
    error: SerializedError;
    user: IUserView;
    token:string;
    isAuthenticated: boolean;
  }
  const initialState:InitialState = {
      loading: false,
      error:{} as SerializedError,
      user:{}as IUserView,
      token:"",
      isAuthenticated: false
  }

  export const userSlice =createSlice({
    name:"Slice",
    initialState:initialState,
    reducers:{
      logOutActions: (state,action)=>{
        state.user = {} as IUserView;
        state.token ="";
        state.isAuthenticated =false;
        TokenUtil.deleteToken();//remove the token from session storage
        ToastUtil.displayInfoToast("Logout is Success!!!");
      }
    },
    extraReducers:(builder)=>{
        builder
        //register a user
      .addCase(UserActions.registerUserAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        UserActions.registerUserAction.fulfilled,
        (state, action) => {
          state.loading = false;
          ToastUtil.displaySuccessToast("Registration is success!!!");
        }
      )
      .addCase(
        UserActions.registerUserAction.rejected,
        (state, action) => {
          state.loading = false;
          ToastUtil.displayErrorToast("Registration is Failed!!!");
          if (isRejectedWithValue(action)) {
            state.error = action.error;
          }
        }
      )
        //login a user
      .addCase(UserActions.loginUserAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        UserActions.loginUserAction.fulfilled,
        (state, action) => {
          state.loading = false;
          state.user = action.payload.data;
          state.token =action.payload.token;
          TokenUtil.saveToken(action.payload.token);//save the token to the session storage
          state.isAuthenticated =true;
          ToastUtil.displaySuccessToast("Login is success!!!");
        }
      )
      .addCase(
        UserActions.loginUserAction.rejected,
        (state, action) => {
          state.loading = false;
          state.user = {} as IUserView;
          state.token ="";
          state.isAuthenticated =false;
          TokenUtil.deleteToken();//remove the token from session storage
          ToastUtil.displayErrorToast("Login is Failed!!!");
          if (isRejectedWithValue(action)) {
            state.error = action.error;
          }
        }
      )
       //getUserInfo
      .addCase(UserActions.getUserInfoAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        UserActions.getUserInfoAction.fulfilled,
        (state, action) => {
          state.loading = false;
          state.user =action.payload.data;
          state.isAuthenticated=true;
        }
      )
      .addCase(
        UserActions.getUserInfoAction.rejected,
        (state, action) => {
          state.loading = false;
          state.user = {} as IUserView;
          ToastUtil.displayErrorToast("GetUser Info is  Failed!!!");
          if (isRejectedWithValue(action)) {
            state.error = action.error;
          }
        }
      )

    }
  })

  export const {logOutActions} =userSlice.actions;