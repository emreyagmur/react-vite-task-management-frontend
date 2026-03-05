import { persistReducer } from "redux-persist";
import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import storage from "redux-persist/lib/storage";
import { IAction } from "@/store/store";
import { BASE_URL } from "@/store/api-url";
import {
  IForgotPassword,
  IForgotPasswordState,
  TActionAllState,
  actionTypes,
  initialState,
} from "@/@types/forgot-password-types";

export const forgotPasswordReducer = persistReducer(
  { storage: storage, key: "forgotPassword" },
  (
    state: IForgotPasswordState = initialState,
    action: IAction<TActionAllState>
  ): IForgotPasswordState => {
    switch (action.type) {
      case actionTypes.SET_FORGOT_PASSWORD: {
        const { forgotPassword } = action.payload;
        return { ...state, forgotPassword };
      }
      case actionTypes.SET_PHASE: {
        const { phase, error } = action.payload;
        return { ...state, phase, error };
      }
      default:
        return state;
    }
  }
);

export const forgotPasswordActions = {
  sendLink: (email: string): IAction<Partial<TActionAllState>> => ({
    type: actionTypes.FORGOT_PASSWORD_SEND_LINK,
    payload: { email },
  }),
  resetPassword: (
    password: string,
    token: string
  ): IAction<Partial<TActionAllState>> => ({
    type: actionTypes.RESET_PASSWORD,
    payload: { password, token },
  }),
  setForgotPassword: (
    forgotPassword: IForgotPassword
  ): IAction<Partial<TActionAllState>> => ({
    type: actionTypes.SET_FORGOT_PASSWORD,
    payload: { forgotPassword },
  }),
  setPhase: (
    phase: string,
    error: string
  ): IAction<Partial<TActionAllState>> => ({
    type: actionTypes.SET_PHASE,
    payload: { phase, error },
  }),
};

export function* saga() {
  yield takeLatest(
    actionTypes.FORGOT_PASSWORD_SEND_LINK,
    function* forgotPasswordSendLinkSaga({
      payload,
    }: IAction<Partial<TActionAllState>>) {
      yield put(
        forgotPasswordActions.setPhase("forgot-password-loading", null)
      );

      const { email } = payload;
      const response = yield axios.post(`${BASE_URL}/send-reset-link`, {
        email: email,
      });

      if (response === undefined) {
        yield put(
          forgotPasswordActions.setPhase(
            "forgot-password-error",
            "Network Error"
          )
        );
        return;
      } else if (response.status !== 200) {
        yield put(
          forgotPasswordActions.setPhase(
            "forgot-password-error",
            response.data.message
          )
        );
        return;
      }

      const { forgotPassword } = response.data;

      yield put(forgotPasswordActions.setForgotPassword(forgotPassword));
      yield put(
        forgotPasswordActions.setPhase("forgot-password-success", null)
      );
    }
  );

  yield takeLatest(
    actionTypes.RESET_PASSWORD,
    function* resetPasswordSaga({
      payload,
    }: IAction<Partial<TActionAllState>>) {
      yield put(forgotPasswordActions.setPhase("reset-password-loading", null));

      const { password, token } = payload;
      const response = yield axios.post(`${BASE_URL}/reset-password`, {
        password: password,
        token: token,
      });

      if (response === undefined) {
        yield put(
          forgotPasswordActions.setPhase(
            "reset-password-error",
            "Network Error"
          )
        );
        return;
      } else if (response.status !== 200) {
        yield put(
          forgotPasswordActions.setPhase(
            "reset-password-error",
            response.data.message
          )
        );
        return;
      }

      yield put(forgotPasswordActions.setPhase("reset-password-success", null));
    }
  );
}
