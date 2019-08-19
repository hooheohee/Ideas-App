import { User } from "@app/models/user";
import * as Store from "@app/store/app-store.module";

export interface UserState {
  users: User[];
  loading: boolean;
  loaded: boolean;
}

export interface AppState extends Store.AppState {
  users: UserState;
}
