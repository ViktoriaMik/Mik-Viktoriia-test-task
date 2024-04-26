import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path:'',redirectTo:'users',pathMatch:'full'},
  {path: 'users', loadChildren: () => import('./pages/users-list/users-list.module').then(m => m.UsersListModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

