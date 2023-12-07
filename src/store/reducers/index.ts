// userReducer.ts
import { USER_LOGIN, USER_LOGOUT } from '../constants';
import { UserAction } from '../types';

const initialState = {
  isLoggedIn: false,
  userData: null,
};

const userReducer = (state = initialState, action: UserAction): typeof initialState => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        isLoggedIn: true
      };
    case USER_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default userReducer
