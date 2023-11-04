import { REACT_APP_JWT_TOKEN } from "../constants";


export class TokenUtil{
  public static saveToken(token:string){
    if(REACT_APP_JWT_TOKEN){
        sessionStorage.setItem(REACT_APP_JWT_TOKEN,token);
    }
  }
  public static getToken(){
    return sessionStorage.getItem(REACT_APP_JWT_TOKEN);
  }
  public static deleteToken(){
    sessionStorage.removeItem(REACT_APP_JWT_TOKEN);
  }
  public static isLoggedIn(){
    let Token = sessionStorage.getItem(REACT_APP_JWT_TOKEN);
    if(Token){
        return true;
    }else{
        return false;
    } //or you can write return !!token
  }
}