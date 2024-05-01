import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UsersListService } from '@/app/pages/users-list/services/users-list.service';
import { IUser } from '@/app/pages/users-list/interfaces/IUser';
import { Observable, tap } from 'rxjs';

export const UserResolver = (api: UsersListService): Resolve<IUser[]> => ({
  resolve: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUser[]> => {
    return api.getUsers().pipe(
      tap(users => {
        api.usersList = users;
      })
    );
  }
});
