import { Action } from "@ngrx/store";
import { User } from "@app/models/user";

export enum UserActions {
  LOAD_USERS = "[User] Load users",
  LOAD_USERS_SUCCESS = "[User] Load users success"
}

export class LoadUsers implements Action {
  readonly type = UserActions.LOAD_USERS;
}

export class LoadUsersSuccess implements Action {
  readonly type = UserActions.LOAD_USERS_SUCCESS;

  constructor(public payload: User[]) {}
}

export type Action = LoadUsers | LoadUsersSuccess;
