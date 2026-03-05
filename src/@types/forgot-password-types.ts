export interface IForgotPassword {
  email?: string;
  created_at?: string;
}

export interface IForgotPasswordState {
  forgotPassword?: IForgotPassword;
  phase?: string;
  error?: string;
}

export type TActionAllState = IForgotPasswordState & {
  email: string;
  password: string;
  token: string;
};

export const actionTypes = {
  FORGOT_PASSWORD_SEND_LINK: "forgotPassword/FORGOT_PASSWORD_SEND_LINK",
  SET_FORGOT_PASSWORD: "forgotPassword/SET_FORGOT_PASSWORD",
  RESET_PASSWORD: "forgotPassword/RESET_PASSWORD",
  SET_PHASE: "forgotPassword/SET_PHASE",
};

export const initialState: IForgotPasswordState = {
  forgotPassword: null,
  phase: null,
  error: null,
};
