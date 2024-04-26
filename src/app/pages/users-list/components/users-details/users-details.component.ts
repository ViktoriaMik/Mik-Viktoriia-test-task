import {Component, OnInit} from '@angular/core';
import {IUser} from '@/app/pages/users-list/interfaces/IUser';
import {UsersListService} from '@/app/pages/users-list/services/users-list.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.scss'],
})
export class UsersDetailsComponent implements OnInit {
  userDetails: IUser;
  isEdit: boolean = false;
  isRemove: boolean = false;

  constructor(private api: UsersListService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.userDetails = this.api.getUserDetails(+id);
    });
  }

  updateUser() {
    this.isEdit = false;
    this.getUserDetails();
  }

  removeUser() {
    this.api.removeUser(this.userDetails);
    this.router.navigate(['users']);
  }
}
