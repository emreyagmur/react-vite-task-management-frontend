import { type IUser } from "@/@types/auth";

export interface ITransactionChart {
  transactionDate: string;
  totalIncome: number;
  totalExpense: number;
}

export interface IDashboardState {
  userTransactionCharts?: ITransactionChart[];
  phase?: string | null;
  error?: string | null;
}

export type TActionAllState = IDashboardState & {
  id: number;
  user: IUser;
};

export const actionTypes = {
  PULL_DASHBOARD_STATES: "dashboard/PULL_DASHBOARD_STATES",
  SET_DASHBOARD_STATES: "dashboard/SET_DASHBOARD_STATES",
  SET_PHASE: "dashboard/SET_PHASE",
};

export const initialState: IDashboardState = {
  userTransactionCharts: [],
  phase: null,
  error: null,
};
