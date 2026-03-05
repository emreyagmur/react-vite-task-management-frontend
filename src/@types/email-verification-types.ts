import { IUser } from "@/@types/auth";

export interface IEmailVerificationState {
  phase?: string;
  error?: string;
}

export type TActionAllState = IEmailVerificationState & {
  id: number;
  user: IUser;
};

export const actionTypes = {
  SEND_EMAIL_VERIFICATION_CODE:
    "emailVerification/SEND_EMAIL_VERIFICATION_CODE",
  SET_PHASE: "emailVerification/SET_PHASE",
};

export const initialState: IEmailVerificationState = {
  phase: null,
  error: null,
};
