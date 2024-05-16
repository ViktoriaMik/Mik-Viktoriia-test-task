import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
import {UsersListService} from '@/app/pages/users-list/services/users-list.service';
import {IUser} from '@/app/pages/users-list/interfaces/IUser';
import {Observable, tap} from 'rxjs';
import {inject} from '@angular/core';


export const UserResolver: ResolveFn<IUser[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  api: UsersListService = inject(UsersListService),
): Observable<IUser[]> => api.getUsers().pipe(
  tap(users => {
    if (!api.usersList) {
      api.usersList = users;
    }
  }),
);
