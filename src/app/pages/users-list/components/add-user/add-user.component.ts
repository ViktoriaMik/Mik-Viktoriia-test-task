import {Component, EventEmitter, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {UsersListService} from '@/app/pages/users-list/services/users-list.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
  @Output() userAdded: EventEmitter<null> = new EventEmitter<null>();
  userForm: FormGroup = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    address: this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
    }),
    phone: ['', [Validators.required, Validators.min(8), this.phoneValidator()]],
  });

  constructor(private fb: FormBuilder, private api: UsersListService) {
  }

  phoneValidator(): ValidatorFn {
    const phonePattern = /^\+?[0-9]{1,3}(-?[0-9]+)*$/;
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = phonePattern.test(control.value);
      return valid ? null : {'invalidPhone': {value: control.value}};
    };
  }

  onSubmit() {
    this.api.addUser(this.userForm.value);
    this.userAdded.emit();
  }
}
