import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersListComponent} from '@/app/pages/users-list/components/users-list/users-list.component';
import {UsersDetailsComponent} from '@/app/pages/users-list/components/users-details/users-details.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DialogComponent} from '@/app/shared/dialog/dialog.component';
import {EditUserComponent} from './components/edit-user/edit-user.component';
import {AddUserComponent} from './components/add-user/add-user.component';
import {UserResolver} from '@/app/pages/users-list/services/user.resolver';


@NgModule({
  declarations: [UsersListComponent, UsersDetailsComponent, EditUserComponent, AddUserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
        {
          path: '', resolve: {user: UserResolver},
          children: [
            {path: '', component: UsersListComponent},
            {path: ':id', component: UsersDetailsComponent},
          ],
        },

      ],
    ),
    FormsModule,
    DialogComponent,
    ReactiveFormsModule,
  ],
  exports: [
    RouterModule,
  ],
  providers: [],
})
export class UsersListModule {
}
