import { type ICountry, type ISession } from "@/@types/static";

export interface IEmailVerification {
  verification_code?: string;
}

export interface IUser {
  id: number;
  username?: string;
  name?: string;
  email?: string;
  email_verified_at?: string;
  is_active?: string;
  profile_pic?: string;
  background_image?: string;
  country?: ICountry;
  session?: ISession[];
}

export interface IAuthState {
  user?: IUser;
  accessToken?: string;
  userTheme?: string;
  lang?: string;
  user_timezone?: string;
  country_id?: string;
  ip_address?: string;
  userAgent?: string;
  error?: string;
  phase?: string;
}

export type TActionAllState = IAuthState & {
  id: number;
  userId: string;
  name: string;
  username: string;
  email: string;
  password: string;
  userInfo: Partial<IUser>;
  verificationCodeInfo: IEmailVerification;
};

export const actionTypes = {
  AUTH_LOGIN: "auth/LOGIN",
  SET_LOGIN_USER: "auth/SET_LOGIN",
  SET_PHASE: "auth/SET_PHASE",
  SET_THEME: "auth/SET_THEME",
  SET_CURRENCY: "auth/SET_CURRENCY",
  SET_LANG: "auth/SET_LANG",
  SET_ACTION_PHASE: "auth/SET_ACTION_PHASE",
  SET_REGISTER: "auth/SET_REGISTER",
  AUTH_LOGOUT: "auth/AUTH_LOGOUT",
  AUTH_LOGOUT_STORE: "auth/AUTH_LOGOUT_STORE",
  DELETE_USER: "auth/DELETE_USER",
  UPDATE_USER_PASSWORD: "auth/UPDATE_USER_PASSWORD",
  UPDATE_USER_PROFILE_PIC: "auth/UPDATE_USER_PROFILE_PIC",
  UPDATE_USER_BACKGROUND_IMAGE: "auth/UPDATE_USER_BACKGROUND_IMAGE",
  UPDATE_USER_INFO_IN_STORE: "auth/UPDATE_USER_INFO_IN_STORE",
  UPDATE_USER: "auth/UPDATE_USER",
  VERIFY_EMAIL: "auth/VERIFY_EMAIL",
  SET_USER_AGENT: "auth/SET_USER_AGENT",
};
