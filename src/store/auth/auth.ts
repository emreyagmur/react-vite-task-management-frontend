import { persistReducer } from "redux-persist";
import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import storage from "redux-persist/lib/storage";
import { IAction } from "@/store/store";
import { BASE_URL } from "@/store/api-url";
import {
  IAuthState,
  IEmailVerification,
  IUser,
  TActionAllState,
  actionTypes,
} from "@/@types/auth";

export const initialAuthState: IAuthState = {
  user: null,
  accessToken: null,
  userTheme: "light",
  lang: "en",
  user_timezone: null,
  country_id: null,
  phase: null,
  error: null,
  userAgent: null,
};

export const authReducer = persistReducer(
  { storage: storage, key: "auth" },
  (
    state: IAuthState = initialAuthState,
    action: IAction<TActionAllState>,
  ): IAuthState => {
    switch (action.type) {
      case actionTypes.AUTH_LOGIN: {
        return { ...state };
      }
      case actionTypes.SET_LOGIN_USER: {
        const { accessToken, user } = action.payload;
        return { ...state, accessToken, user };
      }
      case actionTypes.UPDATE_USER_INFO_IN_STORE: {
        const { user } = action.payload;
        return { ...state, user };
      }
      case actionTypes.AUTH_LOGOUT_STORE: {
        return {
          ...state,
          accessToken: null,
          phase: null,
          error: null,
          user: null,
        };
      }
      case actionTypes.SET_PHASE: {
        const { phase, error } = action.payload;
        return { ...state, phase, error };
      }
      case actionTypes.SET_THEME: {
        const { userTheme } = action.payload;
        return { ...state, userTheme };
      }

      case actionTypes.SET_LANG: {
        const { lang } = action.payload;
        return { ...state, lang };
      }

      case actionTypes.SET_USER_AGENT: {
        const { userAgent } = action.payload;
        return { ...state, userAgent };
      }
      default:
        return state;
    }
  },
);

export const authActions = {
  login: (email: string, password: string, ip_address: string) => ({
    type: actionTypes.AUTH_LOGIN,
    payload: { email, password, ip_address },
  }),
  setUserInfo: (user: IUser, accessToken: string) => ({
    type: actionTypes.SET_LOGIN_USER,
    payload: { user, accessToken },
  }),
  updateUser: (userInfo: Partial<IUser>) => ({
    type: actionTypes.UPDATE_USER,
    payload: { userInfo },
  }),
  updateProfilePic: (
    userInfo: Partial<IUser>,
  ): IAction<Partial<TActionAllState>> => ({
    type: actionTypes.UPDATE_USER_PROFILE_PIC,
    payload: { userInfo },
  }),
  updateBackgroundImage: (
    userInfo: Partial<IUser>,
  ): IAction<Partial<TActionAllState>> => ({
    type: actionTypes.UPDATE_USER_BACKGROUND_IMAGE,
    payload: { userInfo },
  }),
  updateUserInfoInStore: (user: IUser) => ({
    type: actionTypes.UPDATE_USER_INFO_IN_STORE,
    payload: { user },
  }),
  deleteUser: (user: IUser) => ({
    type: actionTypes.DELETE_USER,
    payload: { user },
  }),
  register: (
    name: string,
    email: string,
    password: string,
    country_id: string,
    user_timezone: string,
  ) => ({
    type: actionTypes.SET_REGISTER,
    payload: { name, email, password, country_id, user_timezone },
  }),
  logout: (user: IUser, ip_address: string) => ({
    type: actionTypes.AUTH_LOGOUT,
    payload: { user, ip_address },
  }),
  logoutStore: () => ({
    type: actionTypes.AUTH_LOGOUT_STORE,
  }),
  verifyEmail: (
    userInfo: IUser,
    verificationCodeInfo: IEmailVerification,
  ): IAction<Partial<TActionAllState>> => ({
    type: actionTypes.VERIFY_EMAIL,
    payload: { userInfo, verificationCodeInfo },
  }),
  setPhase: (phase: string, error: string) => ({
    type: actionTypes.SET_PHASE,
    payload: { phase, error },
  }),
  setTheme: (userTheme: string) => ({
    type: actionTypes.SET_THEME,
    payload: { userTheme },
  }),
  setLang: (lang: string) => ({
    type: actionTypes.SET_LANG,
    payload: { lang },
  }),
  setUserAgent: (userAgent: string) => ({
    type: actionTypes.SET_USER_AGENT,
    payload: { userAgent },
  }),
};

export function* saga() {
  yield takeLatest(
    actionTypes.AUTH_LOGIN,
    function* loginSaga({ payload }: IAction<Partial<TActionAllState>>) {
      yield put(authActions.setPhase("loading", null));
      const { email, password, ip_address } = payload;

      const response = yield axios.post(`${BASE_URL}/login`, {
        email: email,
        password: password,
        ip_address: ip_address,
      });

      console.log("Login Response:", response);

      if (response === undefined) {
        yield put(authActions.setPhase("error", "Network Error"));
        return;
      } else if (response.status !== 200) {
        yield put(
          authActions.setPhase(
            "error",
            response.data.message || "Network Error",
          ),
        );
        return;
      }

      const { access_token, user, user_agent } = response.data;

      localStorage.setItem("accessToken", access_token);
      yield put(authActions.setUserInfo(user, access_token));
      yield put(authActions.setUserAgent(user_agent));
      yield put(authActions.setPhase("success", null));
    },
  );

  yield takeLatest(
    actionTypes.SET_REGISTER,
    function* registerSaga({ payload }: IAction<Partial<TActionAllState>>) {
      yield put(authActions.setPhase("loading", null));

      const { name, email, password, country_id, user_timezone } = payload;
      const response = yield axios.post(`${BASE_URL}/register`, {
        name,
        email,
        password,
        country_id,
        user_timezone,
      });

      if (response === undefined) {
        yield put(authActions.setPhase("register-error", "Network Error"));
        return;
      } else if (response.status !== 200) {
        yield put(
          authActions.setPhase("register-error", response.data.message),
        );
        return;
      }

      const { access_token, user } = response.data;

      yield put(authActions.setUserInfo(user, access_token));
      yield put(authActions.setPhase("success", null));
    },
  );

  yield takeLatest(
    actionTypes.AUTH_LOGOUT,
    function* logoutUserSaga({ payload }: IAction<Partial<TActionAllState>>) {
      yield put(authActions.setPhase("user-logout-loading", null));

      const { user, ip_address } = payload;

      const response = yield axios.post(`${BASE_URL}/logout`, {
        user_id: user.id,
        ip_address: ip_address,
      });

      if (response === undefined) {
        yield put(authActions.setPhase("user-logout-error", "Network Error"));
        return;
      } else if (response.status !== 200) {
        yield put(
          authActions.setPhase("user-logout-error", response.data.message),
        );
        return;
      }

      yield put(authActions.logoutStore());
      yield put(authActions.setPhase("user-logout-success", null));
    },
  );

  yield takeLatest(
    actionTypes.DELETE_USER,
    function* deleteUsesrSaga({ payload }: IAction<Partial<TActionAllState>>) {
      yield put(authActions.setPhase("user-deleting", null));

      const { user } = payload;

      const response = yield axios.post(`${BASE_URL}/deleteAccount`, {
        userId: user.id,
      });

      if (response.status !== 200) {
        yield put(authActions.setPhase("user-deleting-error", "API Error!!!"));
        return;
      } else {
        //yield put(authActions.logout());
        yield put(authActions.setPhase("success", null));
      }
    },
  );

  yield takeLatest(
    actionTypes.UPDATE_USER,
    function* updateUserSaga({ payload }: IAction<Partial<TActionAllState>>) {
      yield put(authActions.setPhase("user-updating", null));

      const { userInfo } = payload;

      const response = yield axios.post(
        `${BASE_URL}/update-user/${userInfo.id}`,
        {
          username: userInfo.username,
          name: userInfo?.name,
          email: userInfo?.email,
        },
      );

      if (response === undefined) {
        yield put(
          authActions.setPhase("user-updating-error", "Network Error!"),
        );
        return;
      } else if (response.status !== 200) {
        yield put(
          authActions.setPhase("user-updating-error", response.data.message),
        );
        return;
      }

      const { user } = response.data;

      yield put(authActions.updateUserInfoInStore(user));
      yield put(authActions.setPhase("user-updating-success", null));
    },
  );

  yield takeLatest(
    actionTypes.UPDATE_USER_PROFILE_PIC,
    function* updateUserSaga({ payload }: IAction<Partial<TActionAllState>>) {
      yield put(authActions.setPhase("user-pic-updating", null));

      const { userInfo } = payload;

      const response = yield axios.post(
        `${BASE_URL}/update-profile-pic/${userInfo.id}`,
        {
          profile_pic: userInfo.profile_pic,
        },
      );

      if (response === undefined) {
        yield put(authActions.setPhase("user-pic-error", null));
        return;
      } else if (response.status !== 200) {
        yield put(authActions.setPhase("user-pic-error", response.data.error));
        return;
      }

      const { user } = response.data;

      yield put(authActions.updateUserInfoInStore(user));
      yield put(authActions.setPhase("user-pic-success", null));
    },
  );

  yield takeLatest(
    actionTypes.UPDATE_USER_BACKGROUND_IMAGE,
    function* updateUserBackgroundImageSaga({
      payload,
    }: IAction<Partial<TActionAllState>>) {
      yield put(authActions.setPhase("user-image-updating", null));

      const { userInfo } = payload;

      const response = yield axios.patch(
        `${BASE_URL}/update-background-image/${userInfo.id}`,
        {
          background_image: userInfo.background_image,
        },
      );

      if (response === undefined) {
        yield put(authActions.setPhase("user-image-error", null));
        return;
      } else if (response.status !== 200) {
        yield put(authActions.setPhase("error", response.data.error));
        return;
      }

      const { user } = response.data;

      yield put(authActions.updateUserInfoInStore(user));
      yield put(authActions.setPhase("user-image-success", null));
    },
  );

  yield takeLatest(
    actionTypes.VERIFY_EMAIL,
    function* saveEmailVerificationCodeSaga({
      payload,
    }: IAction<Partial<TActionAllState>>) {
      yield put(authActions.setPhase("verify-email-loading", null));

      const { userInfo, verificationCodeInfo } = payload;
      const response = yield axios.post(
        `${BASE_URL}/verify-mail/${userInfo.id}`,
        {
          verification_code: verificationCodeInfo.verification_code,
        },
      );

      if (response === undefined) {
        yield put(authActions.setPhase("verify-email-error", "Network Error"));
        return;
      } else if (response.status !== 200) {
        yield put(
          authActions.setPhase("verify-email-error", response.data.message),
        );
        return;
      }

      const { user } = response.data;
      yield put(authActions.updateUserInfoInStore(user));

      yield put(authActions.setPhase("verify-email-success", null));
    },
  );
}
