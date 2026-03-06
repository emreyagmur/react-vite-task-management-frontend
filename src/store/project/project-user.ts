import axios from "axios";
import { persistReducer } from "redux-persist";
import { put, takeLatest } from "redux-saga/effects";
import storage from "redux-persist/lib/storage";
import { produce } from "immer";

import { IAction } from "@/store/store";
import { BASE_URL } from "@/store/api-url";

import { IUser } from "@/@types/auth";
import {
  actionTypes,
  initialState,
  IProjectUser,
  IProjecUsertState,
  TActionAllState,
} from "@/@types/project-user-types";
import { IProject } from "@/@types/project-types";

export const projectUserReducer = persistReducer(
  { storage: storage, key: "projectUsers" },
  (
    state: IProjecUsertState = initialState,
    action: IAction<TActionAllState>,
  ): IProjecUsertState => {
    switch (action.type) {
      case actionTypes.SET_PROJECT_USERS: {
        const { projectUsers } = action.payload;
        return { ...state, projectUsers };
      }
      case actionTypes.SET_PHASE: {
        const { phase, error } = action.payload;
        return { ...state, phase, error };
      }
      default:
        return state;
    }
  },
);

export const projectUserActions = {
  pullProjectUsers: (project: IProject): IAction<Partial<TActionAllState>> => ({
    type: actionTypes.PULL_PROJECT_USERS,
    payload: { project },
  }),
  setProjectUsers: (projectUsers: IProjectUser[]) => ({
    type: actionTypes.SET_PROJECT_USERS,
    payload: { projectUsers },
  }),
  setPhase: (phase: string, error: string) => ({
    type: actionTypes.SET_PHASE,
    payload: { phase, error },
  }),
};

export function* saga() {
  yield takeLatest(
    actionTypes.PULL_PROJECT_USERS,
    function* pullProjectUsersSaga({
      payload,
    }: IAction<Partial<TActionAllState>>) {
      yield put(projectUserActions.setPhase("project-users-pulling", null));

      const { project } = payload;
      const response = yield axios.get(
        `${BASE_URL}/get-project-users/${project.id}`,
      );

      if (response === undefined) {
        yield put(
          projectUserActions.setPhase(
            "project-users-pulling-error",
            "Network Error",
          ),
        );
        return;
      } else if (response.status !== 200) {
        yield put(
          projectUserActions.setPhase(
            "project-users-pulling-error",
            response.data.message,
          ),
        );
        return;
      }

      const { projectUsers } = response.data;

      yield put(projectUserActions.setProjectUsers(projectUsers));
      yield put(
        projectUserActions.setPhase("project-users-pulling-success", null),
      );
    },
  );
}
