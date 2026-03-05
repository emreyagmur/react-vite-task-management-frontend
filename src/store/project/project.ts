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
  IProject,
  IProjectState,
  TActionAllState,
} from "@/@types/project-types";

export const projectReducer = persistReducer(
  { storage: storage, key: "projects" },
  (
    state: IProjectState = initialState,
    action: IAction<TActionAllState>,
  ): IProjectState => {
    switch (action.type) {
      case actionTypes.SET_PROJECTS: {
        const { projects } = action.payload;
        return { ...state, projects };
      }
      case actionTypes.SET_ACTIVE_PROJECT: {
        const { activeProject } = action.payload;
        return { ...state, activeProject };
      }
      case actionTypes.SET_PROJECT: {
        const { project } = action.payload;
        return produce(state, (draftState) => {
          const index = draftState.projects.findIndex(
            (d) => d.id === project.id,
          );
          if (index > -1) {
            draftState.projects[index] = project;
          } else {
            draftState.projects.unshift(project);
          }
        });
      }
      case actionTypes.REMOVE_PROJECT: {
        const { id } = action.payload;
        const projects = { ...state }.projects.filter((d) => d.id !== id);
        return { ...state, projects };
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

export const projectActions = {
  pullProjects: (user: IUser): IAction<Partial<TActionAllState>> => ({
    type: actionTypes.PULL_PROJECTS,
    payload: { user },
  }),
  setProjects: (projects: IProject[]) => ({
    type: actionTypes.SET_PROJECTS,
    payload: { projects },
  }),
  addProject: (projectInfo: Partial<IProject>) => ({
    type: actionTypes.ADD_PROJECT,
    payload: { projectInfo },
  }),
  updateProject: (projectInfo: Partial<IProject>) => ({
    type: actionTypes.UPDATE_PROJECT,
    payload: { projectInfo },
  }),
  deleteProject: (id: number) => ({
    type: actionTypes.DELETE_PROJECT,
    payload: { id },
  }),
  removeProject: (id: number) => ({
    type: actionTypes.REMOVE_PROJECT,
    payload: { id },
  }),
  setProject: (project: IProject) => ({
    type: actionTypes.SET_PROJECT,
    payload: { project },
  }),
  setActiveProject: (activeProject: IProject) => ({
    type: actionTypes.SET_ACTIVE_PROJECT,
    payload: { activeProject },
  }),
  setPhase: (phase: string, error: string) => ({
    type: actionTypes.SET_PHASE,
    payload: { phase, error },
  }),
};

export function* saga() {
  yield takeLatest(
    actionTypes.PULL_PROJECTS,
    function* pullProjectsSaga({ payload }: IAction<Partial<TActionAllState>>) {
      yield put(projectActions.setPhase("projects-pulling", null));

      const { user } = payload;
      const response = yield axios.get(`${BASE_URL}/get-projects/${user.id}`);

      if (response === undefined) {
        yield put(
          projectActions.setPhase("projects-pulling-error", "Network Error"),
        );
        return;
      } else if (response.status !== 200) {
        yield put(
          projectActions.setPhase(
            "projects-pulling-error",
            response.data.message,
          ),
        );
        return;
      }

      const { projects } = response.data;

      yield put(projectActions.setProjects(projects));
      yield put(projectActions.setPhase("projects-pulling-success", null));
    },
  );

  yield takeLatest(
    actionTypes.ADD_PROJECT,
    function* addProjectSaga({ payload }: IAction<Partial<TActionAllState>>) {
      yield put(projectActions.setPhase("project-adding", null));

      const { projectInfo } = payload;

      const response = yield axios.post(
        `${BASE_URL}/create-project`,
        projectInfo,
      );

      if (response === undefined) {
        yield put(
          projectActions.setPhase("project-adding-error", "Network Error"),
        );
        return;
      } else if (response.status !== 200) {
        yield put(
          projectActions.setPhase(
            "project-adding-error",
            response.data.message,
          ),
        );
        return;
      }

      const { project } = response.data;

      yield put(projectActions.setProject(project));
      yield put(projectActions.setActiveProject(project));
      yield put(projectActions.setPhase("project-adding-success", null));
    },
  );

  yield takeLatest(
    actionTypes.UPDATE_PROJECT,
    function* updateProjectSaga({
      payload,
    }: IAction<Partial<TActionAllState>>) {
      yield put(projectActions.setPhase("project-updating", null));

      const { projectInfo } = payload;
      const response = yield axios.patch(
        `${BASE_URL}/update-project/${projectInfo.id}`,
        projectInfo,
      );

      if (response === undefined) {
        yield put(
          projectActions.setPhase("project-updating-error", "Network Error"),
        );
        return;
      } else if (response.status !== 200) {
        yield put(
          projectActions.setPhase(
            "project-updating-error",
            response.data.message,
          ),
        );
        return;
      }

      const { project } = response.data;

      yield put(projectActions.setProject(project));
      yield put(projectActions.setPhase("project-updating-success", null));
    },
  );

  yield takeLatest(
    actionTypes.DELETE_PROJECT,
    function* deleteProjectSaga({
      payload,
    }: IAction<Partial<TActionAllState>>) {
      yield put(projectActions.setPhase("project-deleting", null));

      const { id } = payload;
      const response = yield axios.delete(`${BASE_URL}/delete-project/${id}`);

      if (response === undefined) {
        yield put(
          projectActions.setPhase("project-deleting-error", "Network Error"),
        );
        return;
      } else if (response.status !== 200) {
        yield put(
          projectActions.setPhase(
            "project-deleting-error",
            response.data.message,
          ),
        );
        return;
      }

      yield put(projectActions.removeProject(id));
      yield put(projectActions.setPhase("project-deleting-success", null));
    },
  );
}
