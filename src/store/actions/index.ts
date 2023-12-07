import { USER_LOGIN, USER_LOGOUT } from '../constants'

export const userLogin = (userData: unknown) => ({
  type: USER_LOGIN,
  payload: userData,
})

export const userLogout = () => ({
  type: USER_LOGOUT,
})
