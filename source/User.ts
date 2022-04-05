import {Role} from "./Role.js";
export class User{

   constructor(public firstName:string, public middleName :string, public lastName:string,
      public email:string, public phone_no: string,public role: string, public address: string)
   {

   }
}
