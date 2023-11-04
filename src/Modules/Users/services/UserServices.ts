
import axios from "axios";
import { IUserView } from "../Models/IUserView";

export class UserServices {
  private static serverUrl: string = "http://localhost:9999"; 

  /**
   * usage : Register A user  
     method :POST
     params :username,email,password
     url:http://localhost:9999/users/register
     access :Public
   */
  public static registerUser(user:IUserView): Promise<{ status:string,msg:string,data:IUserView }> { //promise coming from uerController
    let dataUrl: string = `${this.serverUrl}/users/register`;
    return axios.post(dataUrl, user);
  }
  /**
   * usage : Login user  
     method :POST
     params :email,password
     url:http://localhost:9999/users/register
     access :Public
   */
     public static LoginUser(user:IUserView): Promise<{data:{ status:string,msg:string,data:IUserView,token:string }}> { //promise coming from uerController
      let dataUrl: string = `${this.serverUrl}/users/login`;
      return axios.post(dataUrl, user);
    }
    /** 
  usage : Login User Info
  method :GET
  params :no-params
  url :http://localhost:9999/users/me
  access :Private
  */
  public static getUserInfo(): Promise<{data:{ status:string,data:IUserView,msg:string }}> { //promise coming from uerController
    let dataUrl: string = `${this.serverUrl}/users/me`;
    return axios.get(dataUrl);
  }
  }