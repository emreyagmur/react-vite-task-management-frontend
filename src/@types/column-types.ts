import { IUser } from "./auth";
import { IProject } from "./project-types";

export interface IProjectColumn {
  id?: number;
  project_id?: number;
  user_id?: number;
  column_name?: string;
}

export interface IProjectColumnState {
  projectColumns?: IProjectColumn[];
  phase?: string;
  error?: string;
}

export type TActionAllState = IProjectColumnState & {
  id: number;
  user: IUser;
  activeProject: IProject;
  projectColumn: IProjectColumn;
  projectColumnInfo: Partial<IProjectColumn>;
};

export const actionTypes = {
  PULL_PROJECT_COLUMNS: "project_columns/PULL_PROJECT_COLUMNS",
  SET_PROJECT_COLUMNS: "project_columns/SET_PROJECT_COLUMNS",
  ADD_PROJECT_COLUMN: "project_columns/ADD_PROJECT_COLUMN",
  UPDATE_PROJECT_COLUMN: "project_columns/UPDATE_PROJECT_COLUMN",
  DELETE_PROJECT_COLUMN: "project_columns/DELETE_PROJECT_COLUMN",
  REMOVE_PROJECT_COLUMN: "project_columns/REMOVE_PROJECT_COLUMN",
  SET_PROJECT_COLUMN: "project_columns/SET_PROJECT_COLUMN",
  SET_PHASE: "project_columns/SET_PHASE",
};

export const initialState: IProjectColumnState = {
  projectColumns: [],
  phase: null,
  error: null,
};
