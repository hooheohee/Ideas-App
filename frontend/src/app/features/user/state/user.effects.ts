import { Injectable } from "@angular/core";
import { Store, Action } from "@ngrx/store";
import { AppState } from ".";
import { ApiService } from "@app/services/api.service";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import {
  LoadUsers,
  UserActions,
  LoadUsersSuccess
} from "@app/features/user/state/user.action";
import { mergeMap, catchError, map, tap } from "rxjs/operators";
import { AddError, RemoveError } from "@app/store/actions/errors.action";
import { User } from "@app/models/user";

@Injectable()
export class UserEffects {
  constructor(
    private action$: Actions,
    private store: Store<AppState>,
    private api: ApiService
  ) {}

  @Effect()
  loadUsers$: Observable<Action> = this.action$.pipe(
    ofType<LoadUsers>(UserActions.LOAD_USERS),
    tap(() => this.store.dispatch(new RemoveError())),
    mergeMap(() =>
      this.api.getUsers().pipe(
        map((users: User[]) => new LoadUsersSuccess(users)),
        catchError(err => of(new AddError(err.error)))
      )
    )
  );
}
