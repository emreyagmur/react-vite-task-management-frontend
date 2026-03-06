import { combineReducers } from "redux";
import { authReducer } from "@/store/auth/auth";
import { deviceLocationReducer } from "./static";
import { countryReducer } from "./country";
import { currencyReducer } from "./currency";
import { forgotPasswordReducer } from "@/store/auth/forgot-password-store";
import { emailVerificationReducer } from "@/store/auth/email-verification-store";
import { projectReducer } from "@/store/project/project";
import { projectColumnReducer } from "@/store/project/projetc-column";
import { projectUserReducer } from "@/store/project/project-user";

const RootReducer = combineReducers({
  auth: authReducer,
  deviceLocation: deviceLocationReducer,
  countries: countryReducer,
  currencies: currencyReducer,
  forgotPassword: forgotPasswordReducer,
  emailVerification: emailVerificationReducer,
  projects: projectReducer,
  projectColumns: projectColumnReducer,
  projectUsers: projectUserReducer,
});

export default RootReducer;
