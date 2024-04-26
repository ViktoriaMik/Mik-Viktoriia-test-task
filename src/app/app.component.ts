import {Component} from '@angular/core';
import {UsersListService} from '@/app/pages/users-list/services/users-list.service';
import {take} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title:string = 'test-task';

  constructor(private userService: UsersListService) {
    this.setUserList();
  }

  setUserList() {
    if (!this.userService.usersList) {
      this.userService.getUsers().pipe(take(1)).subscribe(users => {
        this.userService.usersList = users;
      });
    }
  }
}
