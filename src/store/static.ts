import { createSelector } from "reselect";
import objectPath from "object-path";
import { persistReducer } from "redux-persist";
import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import storage from "redux-persist/lib/storage";
import { IAction } from "@/store/store";

export interface IDeviceLocation {
  ip: string;
  country: string;
  country_code_iso3: string;
  currency: string;
  city: string;
  timezone: string;
}

interface IDeviceLocationState {
  deviceLocation?: IDeviceLocation;
  phase?: string;
  error?: string;
}

type TActionAllState = IDeviceLocationState;

export const actionTypes = {
  PULL_DEVICE_LOCATION: "deviceLocation/PULL_DEVICE_LOCATION",
  SET_DEVICE_LOCATION: "deviceLocation/SET_DEVICE_LOCATION",
  SET_PHASE: "deviceLocation/SET_PHASE",
};

export const initialState: IDeviceLocationState = {
  deviceLocation: null,
  phase: null,
  error: null,
};

export const deviceLocationSelector = createSelector(
  (state: IDeviceLocationState) =>
    objectPath.get(state, ["deviceLocation", "deviceLocation"]),
  (deviceLocation: IDeviceLocation) => deviceLocation
);

export const deviceLocationPhaseSelector = createSelector(
  (state: IDeviceLocationState) =>
    objectPath.get(state, ["deviceLocation", "phase"]),
  (phase: string) => phase
);

export const deviceLocationErrorSelector = createSelector(
  (state: IDeviceLocationState) =>
    objectPath.get(state, ["deviceLocation", "error"]),
  (error: string) => error
);

export const deviceLocationReducer = persistReducer(
  { storage: storage, key: "deviceLocation" },
  (
    state: IDeviceLocationState = initialState,
    action: IAction<TActionAllState>
  ): IDeviceLocationState => {
    switch (action.type) {
      case actionTypes.SET_DEVICE_LOCATION: {
        const { deviceLocation } = action.payload;
        return { ...state, deviceLocation };
      }
      case actionTypes.SET_PHASE: {
        const { phase } = action.payload;
        return { ...state, phase };
      }
      default:
        return state;
    }
  }
);

export const deviceLocationActions = {
  pullDeviceLocation: (): IAction<Partial<TActionAllState>> => ({
    type: actionTypes.PULL_DEVICE_LOCATION,
  }),
  setDeviceLocation: (
    deviceLocation: IDeviceLocation
  ): IAction<Partial<TActionAllState>> => ({
    type: actionTypes.SET_DEVICE_LOCATION,
    payload: { deviceLocation },
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
  yield takeLatest(
    actionTypes.PULL_DEVICE_LOCATION,
    function* pullDeviceLocationSaga() {
      yield put(
        deviceLocationActions.setPhase("get-device-location-loading", null)
      );

      const response = yield axios.get("https://ipapi.co/json/");

      if (response === undefined) {
        yield put(
          deviceLocationActions.setPhase(
            "get-device-location-error",
            "Network Error"
          )
        );
        return;
      } else if (response.status !== 200) {
        yield put(
          deviceLocationActions.setPhase(
            "get-device-location-error",
            response.data.message
          )
        );
        return;
      }

      yield put(deviceLocationActions.setDeviceLocation(response.data));
      yield put(
        deviceLocationActions.setPhase("get-device-location-success", null)
      );
    }
  );
}
