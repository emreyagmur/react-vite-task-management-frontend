import { IUser } from "./auth";

export interface IProject {
  id?: number;
  user_id?: number;
  project_name?: string;
  explanation?: string;
}

export interface IProjectState {
  projects?: IProject[];
  activeProject?: IProject;
  phase?: string;
  error?: string;
}

export type TActionAllState = IProjectState & {
  id: number;
  user: IUser;
  project: IProject;
  projectInfo: Partial<IProject>;
};

export const actionTypes = {
  PULL_PROJECTS: "projects/PULL_PROJECTS",
  SET_PROJECTS: "projects/SET_PROJECTS",
  ADD_PROJECT: "projects/ADD_PROJECT",
  UPDATE_PROJECT: "projects/UPDATE_PROJECT",
  DELETE_PROJECT: "projects/DELETE_PROJECT",
  REMOVE_PROJECT: "projects/REMOVE_PROJECT",
  SET_PROJECT: "projects/SET_PROJECT",
  SET_ACTIVE_PROJECT: "projects/SET_ACTIVE_PROJECT",
  SET_PHASE: "projects/SET_PHASE",
};

export const initialState: IProjectState = {
  projects: [],
  activeProject: null,
  phase: null,
  error: null,
};
