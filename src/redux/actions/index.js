import history from '../../history';
import * as ROUTES from "../../constants/routes";

export const signIn = (userId) => {
    return (dispatch) => {
        dispatch({
            type: 'SIGN_IN',
            payload: userId
        });
        history.push(ROUTES.DASHBOARD);
    };
};

export const signOut = () => {
    return {
        type: 'SIGN_OUT'
    };
};














// export const NAME = () => {
//
// };