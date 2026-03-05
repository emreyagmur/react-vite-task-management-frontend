import { persistReducer } from "redux-persist";
import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import storage from "redux-persist/lib/storage";
import { IAction } from "@/store/store";
import { BASE_URL } from "./api-url";

export interface ICountry {
  iso_code: string;
  iso3_code: string;
  country: string;
  currency_code: string;
  currency_name: string;
  language?: string;
}

interface ICountryState {
  countries?: ICountry[];
  phase?: string;
  error?: string;
}

type TActionAllState = ICountryState;

export const actionTypes = {
  PULL_COUNTRIES: "countries/PULL_COUNTRIES",
  SET_COUNTRIES: "countries/SET_COUNTRIES",
  SET_PHASE: "countries/SET_PHASE",
};

export const initialState: ICountryState = {
  countries: [],
  phase: null,
  error: null,
};

export const countryReducer = persistReducer(
  { storage: storage, key: "countries" },
  (
    state: ICountryState = initialState,
    action: IAction<TActionAllState>
  ): ICountryState => {
    switch (action.type) {
      case actionTypes.SET_COUNTRIES: {
        const { countries } = action.payload;
        return { ...state, countries };
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

export const countryActions = {
  pullCountries: (): IAction<Partial<TActionAllState>> => ({
    type: actionTypes.PULL_COUNTRIES,
  }),
  setCountries: (countries: ICountry[]): IAction<Partial<TActionAllState>> => ({
    type: actionTypes.SET_COUNTRIES,
    payload: { countries },
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
  yield takeLatest(actionTypes.PULL_COUNTRIES, function* pullCountrySaga() {
    yield put(countryActions.setPhase("country-pulling", null));

    const response = yield axios.get(`${BASE_URL}/get-countries`);

    if (response === undefined) {
      yield put(
        countryActions.setPhase("country-pulling-error", "Network Error")
      );
      return;
    } else if (response.status !== 200) {
      yield put(
        countryActions.setPhase("country-pulling-error", response.data.message)
      );
      return;
    }

    const { countries } = response.data;

    yield put(countryActions.setCountries(countries));
    yield put(countryActions.setPhase("country-pulling-success", null));
  });
}
