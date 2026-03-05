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
  IProjectColumn,
  IProjectColumnState,
  TActionAllState,
} from "@/@types/column-types";
import { IProject } from "@/@types/project-types";

export const projectColumnReducer = persistReducer(
  { storage: storage, key: "projectColumns" },
  (
    state: IProjectColumnState = initialState,
    action: IAction<TActionAllState>,
  ): IProjectColumnState => {
    switch (action.type) {
      case actionTypes.SET_PROJECT_COLUMNS: {
        const { projectColumns } = action.payload;
        return { ...state, projectColumns };
      }
      case actionTypes.SET_PROJECT_COLUMN: {
        const { projectColumn } = action.payload;
        return produce(state, (draftState) => {
          const index = draftState.projectColumns.findIndex(
            (d) => d.id === projectColumn.id,
          );
          if (index > -1) {
            draftState.projectColumns[index] = projectColumn;
          } else {
            draftState.projectColumns.unshift(projectColumn);
          }
        });
      }
      case actionTypes.DELETE_PROJECT_COLUMN: {
        const { id } = action.payload;
        const projectColumns = { ...state }.projectColumns.filter(
          (d) => d.id !== id,
        );
        return { ...state, projectColumns };
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

export const projectColumnActions = {
  pullProjectColumns: (
    user: IUser,
    activeProject: IProject,
  ): IAction<Partial<TActionAllState>> => ({
    type: actionTypes.PULL_PROJECT_COLUMNS,
    payload: { user, activeProject },
  }),
  setProjectColumns: (projectColumns: IProjectColumn[]) => ({
    type: actionTypes.SET_PROJECT_COLUMNS,
    payload: { projectColumns },
  }),
  addProjectColumn: (projectColumnInfo: IProjectColumn) => ({
    type: actionTypes.ADD_PROJECT_COLUMN,
    payload: { projectColumnInfo },
  }),
  updateProjectColumn: (projectColumnInfo: Partial<IProjectColumn>) => ({
    type: actionTypes.UPDATE_PROJECT_COLUMN,
    payload: { projectColumnInfo },
  }),
  deleteProjectColumn: (id: number) => ({
    type: actionTypes.DELETE_PROJECT_COLUMN,
    payload: { id },
  }),
  removeProjectColumn: (id: number) => ({
    type: actionTypes.REMOVE_PROJECT_COLUMN,
    payload: { id },
  }),
  setProjectColumn: (projectColumn: IProjectColumn) => ({
    type: actionTypes.SET_PROJECT_COLUMN,
    payload: { projectColumn },
  }),
  setPhase: (phase: string, error: string) => ({
    type: actionTypes.SET_PHASE,
    payload: { phase, error },
  }),
};

export function* saga() {
  yield takeLatest(
    actionTypes.PULL_PROJECT_COLUMNS,
    function* pullProjectColumnsSaga({
      payload,
    }: IAction<Partial<TActionAllState>>) {
      yield put(projectColumnActions.setPhase("project-columns-pulling", null));

      const { activeProject } = payload;
      const response = yield axios.get(
        `${BASE_URL}/get-project-columns/${activeProject.id}`,
      );

      if (response === undefined) {
        yield put(
          projectColumnActions.setPhase(
            "project-columns-pulling-error",
            "Network Error",
          ),
        );
        return;
      } else if (response.status !== 200) {
        yield put(
          projectColumnActions.setPhase(
            "project-columns-pulling-error",
            response.data.message,
          ),
        );
        return;
      }

      const { columns } = response.data;

      yield put(projectColumnActions.setProjectColumns(columns));
      yield put(
        projectColumnActions.setPhase("project-columns-pulling-success", null),
      );
    },
  );

  yield takeLatest(
    actionTypes.ADD_PROJECT_COLUMN,
    function* addProjectSaga({ payload }: IAction<Partial<TActionAllState>>) {
      yield put(projectColumnActions.setPhase("project-column-adding", null));

      const { projectColumnInfo } = payload;

      console.log("projectColumnInfo");
      console.log(projectColumnInfo);
      const response = yield axios.post(
        `${BASE_URL}/create-project-column`,
        projectColumnInfo,
      );

      if (response === undefined) {
        yield put(
          projectColumnActions.setPhase(
            "project-column-adding-error",
            "Network Error",
          ),
        );
        return;
      } else if (response.status !== 200) {
        yield put(
          projectColumnActions.setPhase(
            "project-column-adding-error",
            response.data.message,
          ),
        );
        return;
      }

      const { projectColumn } = response.data;

      yield put(projectColumnActions.setProjectColumn(projectColumn));
      yield put(
        projectColumnActions.setPhase("project-column-adding-success", null),
      );
    },
  );

  yield takeLatest(
    actionTypes.UPDATE_PROJECT_COLUMN,
    function* updateProjectColumnSaga({
      payload,
    }: IAction<Partial<TActionAllState>>) {
      yield put(projectColumnActions.setPhase("project-column-updating", null));

      const { projectColumnInfo } = payload;
      const response = yield axios.patch(
        `${BASE_URL}/update-project-column/${projectColumnInfo.id}`,
        projectColumnInfo,
      );

      if (response === undefined) {
        yield put(
          projectColumnActions.setPhase(
            "project-column-updating-error",
            "Network Error",
          ),
        );
        return;
      } else if (response.status !== 200) {
        yield put(
          projectColumnActions.setPhase(
            "project-column-updating-error",
            response.data.message,
          ),
        );
        return;
      }

      const { projectColumn } = response.data;

      yield put(projectColumnActions.setProjectColumn(projectColumn));
      yield put(
        projectColumnActions.setPhase("project-column-updating-success", null),
      );
    },
  );

  yield takeLatest(
    actionTypes.DELETE_PROJECT_COLUMN,
    function* deleteProjectColumnSaga({
      payload,
    }: IAction<Partial<TActionAllState>>) {
      yield put(projectColumnActions.setPhase("project-column-deleting", null));

      const { id } = payload;
      const response = yield axios.delete(
        `${BASE_URL}/delete-project-column/${id}`,
      );

      if (response === undefined) {
        yield put(
          projectColumnActions.setPhase(
            "project-column-deleting-error",
            "Network Error",
          ),
        );
        return;
      } else if (response.status !== 200) {
        yield put(
          projectColumnActions.setPhase(
            "project-column-deleting-error",
            response.data.message,
          ),
        );
        return;
      }

      yield put(projectColumnActions.removeProjectColumn(id));
      yield put(
        projectColumnActions.setPhase("project-column-deleting-success", null),
      );
    },
  );
}
