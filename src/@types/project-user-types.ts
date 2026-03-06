import { IUser } from "./auth";
import { IProject } from "./project-types";

export interface IProjectUser {
  id?: number;
  user_id?: number;
  project_id?: number;
  is_admin?: string;
  user?: IUser;
}

export interface IProjecUsertState {
  projectUsers?: IProjectUser[];
  phase?: string;
  error?: string;
}

export type TActionAllState = IProjecUsertState & {
  id: number;
  user: IUser;
  project: IProject;
  projectUser: IProjectUser;
  projectUserInfo: Partial<IProject>;
};

export const actionTypes = {
  PULL_PROJECT_USERS: "projectUsers/PULL_PROJECT_USERS",
  SET_PROJECT_USERS: "projectUsers/SET_PROJECT_USERS",
  ADD_PROJECT_USER: "projectUsers/ADD_PROJECT_USER",
  UPDATE_PROJECT_USER: "projectUsers/UPDATE_PROJECT_USER",
  DELETE_PROJECT_USER: "projectUsers/DELETE_PROJECT_USER",
  REMOVE_PROJECT_USER: "projectUsers/REMOVE_PROJECT_USER",
  SET_PROJECT_USER: "projectUsers/SET_PROJECT_USER",
  SET_PHASE: "projectUsers/SET_PHASE",
};

export const initialState: IProjecUsertState = {
  projectUsers: [],
  phase: null,
  error: null,
};
