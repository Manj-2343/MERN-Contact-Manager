import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserServices } from "../../Modules/Users/services/UserServices";
import { IUserView } from "../../Modules/Users/Models/IUserView";
import { AuthUtil } from "../../Util/AuthenticationUtil";

/**
 * Register A user
 */
export const registerUserAction = createAsyncThunk(
    "users/registerUserAction",
    async (payload: {user:IUserView}, { rejectWithValue }):Promise<{status:string,msg:string,data:IUserView}|any> => {
      try {
        const {user} =payload;
        const response = await UserServices.registerUser(user);
        return response.data;
      } catch (error:any) {
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error.response.data);
      }
    }
  );
/**
 * Login a User
 */
export const loginUserAction:any = createAsyncThunk(
    "users/loginUserAction",
    async (payload: {user:IUserView}, { rejectWithValue }):Promise<{ status:string,msg:string,data:IUserView,token:string }|any> => {
      try {
        const {user} =payload;
        const response = await UserServices.LoginUser(user);
        return response.data;
      } catch (error:any) {
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error.response.data);
      }
    }
  );
/**
 *get  User info
 Private
 */
export const getUserInfoAction:any = createAsyncThunk(
    "users/getUserInfoAction",
    async (payload: {}, { rejectWithValue }):Promise<{ status:string,data:IUserView,msg:string }|any> => {
      try {
        if(AuthUtil.issetTokenToRequestHeaders()){//private
          const response = await UserServices.getUserInfo();
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