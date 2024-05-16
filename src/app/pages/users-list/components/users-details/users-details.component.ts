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
  public userDetails: IUser;
  public isEdit: boolean = false;
  public isRemove: boolean = false;

  constructor(
    private api: UsersListService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  private getUserDetails(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.userDetails = this.api.getUserDetails(id);
    });
  }

  public updateUser(): void {
    this.isEdit = false;
    this.getUserDetails();
  }

  public removeUser(): void {
    this.api.removeUser(this.userDetails);
    this.router.navigate(['users']);
  }
}
