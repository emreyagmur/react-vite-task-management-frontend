import { persistReducer } from "redux-persist";
import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import storage from "redux-persist/lib/storage";
import { IAction } from "@/store/store";
import { BASE_URL } from "./api-url";

export interface ICurrency {
  id?: number;
  name?: string;
  code?: string;
  symbol: string;
}

interface ICurrencyState {
  currencies?: ICurrency[];
  phase?: string;
  error?: string;
}

type TActionAllState = ICurrencyState;

export const actionTypes = {
  PULL_CURRENCIES: "currencies/PULL_CURRENCIES",
  SET_CURRENCIES: "currencies/SET_CURRENCIES",
  SET_PHASE: "currencies/SET_PHASE",
};

export const initialState: ICurrencyState = {
  currencies: [],
  phase: null,
  error: null,
};

export const currencyReducer = persistReducer(
  { storage: storage, key: "currencies" },
  (
    state: ICurrencyState = initialState,
    action: IAction<TActionAllState>
  ): ICurrencyState => {
    switch (action.type) {
      case actionTypes.SET_CURRENCIES: {
        const { currencies } = action.payload;
        return { ...state, currencies };
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

export const currencyActions = {
  pullCurrencies: (): IAction<Partial<TActionAllState>> => ({
    type: actionTypes.PULL_CURRENCIES,
  }),
  setCurrencies: (
    currencies: ICurrency[]
  ): IAction<Partial<TActionAllState>> => ({
    type: actionTypes.SET_CURRENCIES,
    payload: { currencies },
  }),
  setPhase: (
    phase: string,
    error: string
  ): IAction<Partial<TActionAllState>> => ({
    type: actionTypes.SET_PHASE,
    payload: { phase, error },
  }),
};

export function* saga() {
  yield takeLatest(actionTypes.PULL_CURRENCIES, function* pullCurrencySaga() {
    yield put(currencyActions.setPhase("currency-pulling", null));

    const response = yield axios.get(`${BASE_URL}/get-currencies`);

    if (response === undefined) {
      yield put(
        currencyActions.setPhase("currency-pulling-error", "Network Error")
      );
      return;
    } else if (response.status !== 200) {
      yield put(
        currencyActions.setPhase(
          "currency-pulling-error",
          response.data.message
        )
      );
      return;
    }

    const { currencies } = response.data;

    yield put(currencyActions.setCurrencies(currencies));
    yield put(currencyActions.setPhase("currency-pulling-success", null));
  });
}
