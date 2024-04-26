import {Component, OnInit} from '@angular/core';
import {UsersListService} from '@/app/pages/users-list/services/users-list.service';
import {IUser} from '@/app/pages/users-list/interfaces/IUser';
import {take} from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  users: IUser[] = [];
  filteredUsers: IUser[] = [];
  searchInput: string;
  isAddUser: boolean = false;


  constructor(private api: UsersListService) {
  }

  ngOnInit() {
    this.setUserList();
  }

  setUserList() {
    if (!this.api.usersList) {
      this.api.getUsers().pipe(take(1)).subscribe(users => {
        this.api.usersList = users;
        this.users = users;
        this.filteredUsers=users
      });
    } else {
      this.users = this.api.usersList;
      this.filteredUsers=this.api.usersList
    }
  }

  setSearchInput() {
    this.filteredUsers = this.users.filter(user => {
      return user.name.toLowerCase().includes(this.searchInput.toLowerCase()) ||
        user.phone.includes(this.searchInput);
    });
  }

  userAdded() {
    this.isAddUser = false;
    this.setUserList();
  }
}
