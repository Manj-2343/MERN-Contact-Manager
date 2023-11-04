import { IContactsView } from "../Models/IContactsView";
import axios from "axios";
import { IGroupsView } from "../Models/IGroupsView";

export class ContactService {
  private static serverUrl: string = "http://localhost:9999"; 
  /** 
  usage : to get all contacts
  method :GET
  params :no-params(params means form data)
  url :http://localhost:9999/contacts/
  */
  public static getAllContacts(): Promise<{ data: IContactsView[] }> {
    let dataUrl: string = `${this.serverUrl}/contacts`;
    return axios.get(dataUrl);
  }
  /** 
  usage : to get a contact by id
  method :GET
  params :no-params(params means form data)
  url :http://localhost:9999/contacts/:id
  */
  public static getContact(contactId: string): Promise<{ data: IContactsView }> {
    let dataUrl: string = `${this.serverUrl}/contacts/${contactId}`;
    return axios.get(dataUrl);
  }
  /**
   * usage : Create the  contacts
     method :POST
     params :name.imageUrl,email.mobile,title,groupId(because of this we use contact:IContact )
     url:http://localhost:9999/contacts/
   */
  public static createContact(contact: IContactsView): Promise<{ data: IContactsView }> {
    let dataUrl: string = `${this.serverUrl}/contacts/`;
    return axios.post(dataUrl, contact);
  }
  /**this will be the add + create(contactId:string,contact:IContact)
   * 
*  usage  :Update the  contact
   method :PUT
   params :name.imageUrl,email.mobile,title,groupId
   url :http://localhost:9999/contacts/:contactId
   */
  public static updateContact(
    contactId: string,
    contact: IContactsView
  ): Promise<{ data: IContactsView }> {
    let dataUrl: string = `${this.serverUrl}/contacts/${contactId}`;
    return axios.put(dataUrl, contact);
  }

  /**
   * usage :Delete the  contact
   method :DELETE
   params :no-params(params means form data)
   url :http://localhost:9999/contacts/:contactId */
  public static deleteContact(contactId: string): Promise<{ data: {} }> {
    let dataUrl: string = `${this.serverUrl}/contacts/${contactId}`;
    return axios.delete(dataUrl);
  }
  /**
   * usage : Get All Groups
     method :Get
     params :no-Params
     url :http://localhost:9999/groups
   */
  public static getAllGroups(): Promise<{ data: IGroupsView[] }> {
    let dataUrl: string = `${this.serverUrl}/groups`;
    return axios.get(dataUrl);
  }
  /**
   * usage : Get a Group
     method :Get
     params :no-Params
     url :http://localhost:9999/groups/:groupId
   */
     public static getGroup(contact: IContactsView): Promise<{ data: IGroupsView }> {
      let groupId = contact.data.groupId; 
      let dataUrl: string = `${this.serverUrl}/groups/${groupId}`;
      return axios.get(dataUrl);
    }
}
