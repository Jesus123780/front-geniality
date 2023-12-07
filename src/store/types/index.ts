import { USER_LOGIN, USER_LOGOUT } from '../constants'

export type UserData = {
    id: number;
    username: string;
    email: string;
}

export type UserAction = {
    type: typeof USER_LOGIN | typeof USER_LOGOUT;
    payload: UserData | null;
};