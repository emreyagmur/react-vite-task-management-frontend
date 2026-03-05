import { createSelector } from "reselect";
import objectPath from "object-path";
import { persistReducer } from "redux-persist";
import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import storage from "redux-persist/lib/storage";
import { IAction } from "@/store/store";
import { BASE_URL } from "@/store/api-url";
import {
  IEmailVerificationState,
  TActionAllState,
  actionTypes,
  initialState,
} from "@/@types/email-verification-types";
import { IUser } from "@/@types/auth";

export const emailVerificationPhaseSelector = createSelector(
  (state: IEmailVerificationState) =>
    objectPath.get(state, ["emailVerification", "phase"]),
  (phase: string) => phase
);

export const emailVerificationErrorSelector = createSelector(
  (state: IEmailVerificationState) =>
    objectPath.get(state, ["emailVerification", "error"]),
  (error: string) => error
);

export const emailVerificationReducer = persistReducer(
  { storage: storage, key: "emailVerification" },
  (
    state: IEmailVerificationState = initialState,
    action: IAction<TActionAllState>
  ): IEmailVerificationState => {
    switch (action.type) {
      case actionTypes.SET_PHASE: {
        const { phase, error } = action.payload;
        return { ...state, phase, error };
      }
      default:
        return state;
    }
  }
);

export const emailVerificationActions = {
  sendEmailVerificationCode: (
    user: IUser
  ): IAction<Partial<TActionAllState>> => ({
    type: actionTypes.SEND_EMAIL_VERIFICATION_CODE,
    payload: { user },
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
    actionTypes.SEND_EMAIL_VERIFICATION_CODE,
    function* sendEmailVerificationCodeSaga({
      payload,
    }: IAction<Partial<TActionAllState>>) {
      yield put(
        emailVerificationActions.setPhase(
          "email-verification-code-loading",
          null
        )
      );

      const { user } = payload;
      const response = yield axios.post(
        `${BASE_URL}/send-verification-mail/${user.id}`
      );

      if (response === undefined) {
        yield put(
          emailVerificationActions.setPhase(
            "email-verification-code-error",
            "Network Error"
          )
        );
        return;
      } else if (response.status !== 200) {
        yield put(
          emailVerificationActions.setPhase(
            "email-verification-code-error",
            response.data.message
          )
        );
        return;
      } else if (!response.data.success) {
        yield put(
          emailVerificationActions.setPhase(
            "email-verification-code-error",
            response.data.message
          )
        );
        return;
      }

      yield put(
        emailVerificationActions.setPhase(
          "email-verification-code-success",
          null
        )
      );
    }
  );
}
