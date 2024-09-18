import apiClient from "../apiClient";
import { UserInfo, UserToken } from "#/entity";

export interface SignInReq{
  username: string;
  password: string;
}
export type SignInRes = UserToken & { user: UserInfo };

export enum UserApi{
  SignIn = '/auth/signin',
  SignUp = '/auth/signup',
  LouOut = '/auth/logout',
  Refresh = '/auth/refresh',
  User = '/user/',
}
const signin = (data: SignInReq) => apiClient.post<SignInRes>({ url: UserApi.SignIn, data });
const findById = (id: string) => apiClient.get({ url: `${UserApi.User}${id}` });
export default {
  signin,
  findById,
};