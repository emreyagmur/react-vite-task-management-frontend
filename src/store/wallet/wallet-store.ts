import axios from "axios";
import { persistReducer } from "redux-persist";
import { put, takeLatest } from "redux-saga/effects";
import storage from "redux-persist/lib/storage";
import { produce } from "immer";

import { IAction } from "@/store/store";
import { BASE_URL } from "@/store/api-url";
import {
  IWallet,
  IWalletState,
  TActionAllState,
  actionTypes,
  initialState,
} from "@/@types/wallet-types";
import { IUser } from "@/@types/auth";

export const walletReducer = persistReducer(
  { storage: storage, key: "wallets" },
  (
    state: IWalletState = initialState,
    action: IAction<TActionAllState>
  ): IWalletState => {
    switch (action.type) {
      case actionTypes.SET_WALLETS: {
        const { wallets } = action.payload;
        return { ...state, wallets };
      }
      case actionTypes.SET_ACTIVE_WALLET: {
        const { activeWallet } = action.payload;
        return { ...state, activeWallet };
      }
      case actionTypes.SET_WALLET: {
        const { wallet } = action.payload;
        return produce(state, (draftState) => {
          const index = draftState.wallets.findIndex((d) => d.id === wallet.id);
          if (index > -1) {
            draftState.wallets[index] = wallet;
          } else {
            draftState.wallets.unshift(wallet);
          }
        });
      }
      case actionTypes.REMOVE_WALLET: {
        const { id } = action.payload;
        const wallets = { ...state }.wallets.filter((d) => d.id !== id);
        return { ...state, wallets };
      }
      case actionTypes.SET_PHASE: {
        const { phase, error } = action.payload;
        return { ...state, phase, error };
      }
      default:
        return state;
    }
  }
);

export const walletActions = {
  pullWallets: (user: IUser): IAction<Partial<TActionAllState>> => ({
    type: actionTypes.PULL_WALLETS,
    payload: { user },
  }),
  setWallets: (wallets: IWallet[]) => ({
    type: actionTypes.SET_WALLETS,
    payload: { wallets },
  }),
  addWallet: (walletInfo: Partial<IWallet>) => ({
    type: actionTypes.ADD_WALLET,
    payload: { walletInfo },
  }),
  updateWallet: (walletInfo: Partial<IWallet>) => ({
    type: actionTypes.UPDATE_WALLET,
    payload: { walletInfo },
  }),
  deleteWallet: (id: number) => ({
    type: actionTypes.DELETE_WALLET,
    payload: { id },
  }),
  removeWallet: (id: number) => ({
    type: actionTypes.REMOVE_WALLET,
    payload: { id },
  }),
  setWallet: (wallet: IWallet) => ({
    type: actionTypes.SET_WALLET,
    payload: { wallet },
  }),
  setActiveWallet: (activeWallet: IWallet) => ({
    type: actionTypes.SET_ACTIVE_WALLET,
    payload: { activeWallet },
  }),
  setPhase: (phase: string, error: string) => ({
    type: actionTypes.SET_PHASE,
    payload: { phase, error },
  }),
};

export function* saga() {
  yield takeLatest(
    actionTypes.PULL_WALLETS,
    function* pullWalletsSaga({ payload }: IAction<Partial<TActionAllState>>) {
      yield put(walletActions.setPhase("wallets-pulling", null));

      const { user } = payload;
      const response = yield axios.get(`${BASE_URL}/get-wallets/${user.id}`);

      if (response === undefined) {
        yield put(
          walletActions.setPhase("wallets-pulling-error", "Network Error")
        );
        return;
      } else if (response.status !== 200) {
        yield put(
          walletActions.setPhase("wallets-pulling-error", response.data.message)
        );
        return;
      }

      const { userWallets } = response.data;

      yield put(walletActions.setWallets(userWallets));
      yield put(walletActions.setPhase("wallets-pulling-success", null));
    }
  );

  yield takeLatest(
    actionTypes.ADD_WALLET,
    function* addWalletSaga({ payload }: IAction<Partial<TActionAllState>>) {
      yield put(walletActions.setPhase("wallet-adding", null));

      const { walletInfo } = payload;

      const response = yield axios.post(
        `${BASE_URL}/create-wallet`,
        walletInfo
      );

      if (response === undefined) {
        yield put(
          walletActions.setPhase("wallet-adding-error", "Network Error")
        );
        return;
      } else if (response.status !== 200) {
        yield put(
          walletActions.setPhase("wallet-adding-error", response.data.message)
        );
        return;
      }

      const { userWallet } = response.data;

      yield put(walletActions.setWallet(userWallet));
      yield put(walletActions.setPhase("wallet-adding-success", null));
    }
  );

  yield takeLatest(
    actionTypes.UPDATE_WALLET,
    function* updateWalletSaga({ payload }: IAction<Partial<TActionAllState>>) {
      yield put(walletActions.setPhase("wallet-updating", null));

      const { walletInfo } = payload;
      const response = yield axios.patch(
        `${BASE_URL}/update-wallet/${walletInfo.id}`,
        walletInfo
      );

      if (response === undefined) {
        yield put(
          walletActions.setPhase("wallet-updating-error", "Network Error")
        );
        return;
      } else if (response.status !== 200) {
        yield put(
          walletActions.setPhase("wallet-updating-error", response.data.message)
        );
        return;
      }

      const { userWallet } = response.data;

      yield put(walletActions.setWallet(userWallet));
      yield put(walletActions.setPhase("wallet-updating-success", null));
    }
  );

  yield takeLatest(
    actionTypes.DELETE_WALLET,
    function* deleteWalletSaga({ payload }: IAction<Partial<TActionAllState>>) {
      yield put(walletActions.setPhase("wallet-deleting", null));

      const { id } = payload;
      const response = yield axios.delete(`${BASE_URL}/delete-wallet/${id}`);

      if (response === undefined) {
        yield put(
          walletActions.setPhase("wallet-deleting-error", "Network Error")
        );
        return;
      } else if (response.status !== 200) {
        yield put(
          walletActions.setPhase("wallet-deleting-error", response.data.message)
        );
        return;
      }

      yield put(walletActions.removeWallet(id));
      yield put(walletActions.setPhase("wallet-deleting-success", null));
    }
  );
}
