import { UserState } from ".";
import { Action, UserActions } from "@app/features/user/state/user.action";

const initialState: UserState = {
  loaded: false,
  loading: false,
  users: []
};

export const userReducer: (state: UserState, action: Action) => UserState = (
  state = initialState,
  action
) => {
  switch (action.type) {
    default:
      return state;
    case UserActions.LOAD_USERS:
      return {
        ...state,
        loaded: false,
        loading: true
      };
    case UserActions.LOAD_USERS_SUCCESS:
      return {
        ...state,
        loaded: true,
        loading: false,
        users: action.payload
      };
  }
};
