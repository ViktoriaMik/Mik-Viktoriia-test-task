import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IUser} from '@/app/pages/users-list/interfaces/IUser';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersListService} from '@/app/pages/users-list/services/users-list.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent {
  private _user: IUser;
  userForm: FormGroup;
  @Input()
  get user(): IUser {
    return this._user;
  }

  set user(user: IUser) {
    this._user = user;
    this.buildUserForm(user);
  }
  @Output() userUpdated: EventEmitter<IUser> = new EventEmitter<IUser>();


  constructor(private fb: FormBuilder, private api: UsersListService) {
  }

  buildUserForm(user: IUser) {
    this.userForm = this.fb.group({
      id: [user.id],
      name: [user.name, Validators.required],
      username: [user.username, Validators.required],
      email: [user.email, [Validators.required, Validators.email]],
      address: this.fb.group({
        street: [user.address.street, Validators.required],
        city: [user.address.city, Validators.required],
      }),
      phone: [user.phone, Validators.required],
    });
  }

  onSubmit() {
    this.api.updateUser(this.userForm.value);
    this.userUpdated.emit(this.userForm.value);
  }
}
