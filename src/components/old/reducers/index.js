import { combineReducers} from "redux";
import authReducer from "./authReducer";
import AuthGoogle from "./AuthGoogle";

export default combineReducers({
    auth: authReducer,
    AuthGoogle: AuthGoogle,
});