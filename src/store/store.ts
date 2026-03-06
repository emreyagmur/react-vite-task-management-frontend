import { Action, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import { persistStore } from "redux-persist";
import { all } from "redux-saga/effects";
import RootReducer from "@/store/root-reducer";
import * as auth from "@/store/auth/auth";
import * as deviceLocation from "./static";
import * as country from "@/store/country";
import * as currency from "@/store/currency";
import * as forgotPassword from "@/store/auth/forgot-password-store";
import * as emailVerification from "@/store/auth/email-verification-store";
import * as project from "@/store/project/project";
import * as projectColumn from "@/store/project/projetc-column";
import * as projectUser from "@/store/project/project-user";

const sagaMiddleware = createSagaMiddleware();

export function* rootSaga() {
  const mainSagas = [
    auth.saga(),
    deviceLocation.saga(),
    country.saga(),
    currency.saga(),
    forgotPassword.saga(),
    emailVerification.saga(),
    project.saga(),
    projectColumn.saga(),
    projectUser.saga(),
  ];
  yield all(mainSagas);
}

const store = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
      thunk: true,
    }).concat(sagaMiddleware, logger),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

// Run sagas
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type TPhase =
  | null
  | "loading"
  | "adding"
  | "updating"
  | "deleting"
  | "error"
  | "success";

export type AppError = {
  key: string;
  title: string;
};
export interface IAction<T> extends Action<string> {
  type: string;
  payload?: T;
}

export default store;
