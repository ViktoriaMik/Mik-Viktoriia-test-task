import {IAddress} from '@/app/pages/users-list/interfaces/IAdress';

export interface IUser{
  id: number;
  name: string;
  username: string;
  email: string;
  address:IAddress;
  phone: string;
}
