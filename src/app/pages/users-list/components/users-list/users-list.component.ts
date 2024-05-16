import {Component, OnInit} from '@angular/core';
import {UsersListService} from '@/app/pages/users-list/services/users-list.service';
import {IUser} from '@/app/pages/users-list/interfaces/IUser';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  public users: IUser[] = [];
  public filteredUsers: IUser[] = [];
  public searchInput: string;
  public isAddUser: boolean = false;

  constructor(private api: UsersListService) {
  }

  ngOnInit(): void {
    this.setUserList();
  }

  private setUserList(): void {
    this.users = this.api.usersList;
    this.filteredUsers = this.api.usersList;
  }

  public setSearchInput(): void {
    this.filteredUsers = this.users.filter(user => {
      return user.name.toLowerCase().includes(this.searchInput.toLowerCase()) ||
        user.phone.includes(this.searchInput);
    });
  }

  public userAdded(): void {
    this.isAddUser = false;
    this.setUserList();
  }
}
