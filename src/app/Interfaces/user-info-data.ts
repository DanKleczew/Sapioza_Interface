export interface UserInfoData {
  id : number;
  name : string;
  firstName : string;
  email : string;
  password : string;
  UsersIds : number[];
  creationDate : string;
  deletionDate : string|null;
  role : string;
  uuid : string;
}
