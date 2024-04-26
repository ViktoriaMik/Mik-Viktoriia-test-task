import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@/environments/environment';
import {Observable} from 'rxjs';
import {IUser} from '../interfaces/IUser';

const API = {
  getUsers: '/users',
};

@Injectable({
  providedIn: 'root',
})
export class UsersListService {

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(environment.api + API.getUsers);
  }

  set usersList(users: IUser[]) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  get usersList() {
    return JSON.parse(<string>localStorage.getItem('users'));
  }

  addUser(user: IUser) {
    const users = this.usersList;
    user.id=Math.floor(Math.random() * 10000) + 1;
    users.push(user);
    this.usersList = users;
  }

  removeUser(user: IUser) {
    const users = this.usersList;
    this.usersList = users.filter(item => item.id != user.id);
  }

  updateUser(updatedUser: IUser) {
    const index = this.usersList.findIndex(user => user.id ===(+ updatedUser.id));
    if (index !== -1) {
      let users=this.usersList
      users[index] = {...updatedUser};
      this.usersList=users
    } else {
      throw new Error('User not found');
    }
  }

  getUserDetails(id: number): IUser {
    const index = this.usersList.findIndex(user => {
      return user.id === id;

    });
    if (index !== -1) {
      return this.usersList[index];
    } else {
      throw new Error('User not found');
    }
  }
}
