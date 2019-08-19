import { SIGN_IN, SIGN_OUT } from './types';
import history from '../../../history';

export const signIn = (userId, userName, userEmail, userImage ) => {
    return (dispatch) => {
        dispatch({
            type: SIGN_IN,
            payload: { userId, userName, userEmail, userImage }
        });
    };
};

export const signOut = () => {
    return (dispatch) => {
        dispatch({
            type: SIGN_OUT
        });
        history.push('/');
    };
}

export const signInGoogle = (uid) => {
    return (dispatch) => {
        dispatch({
            type: 'SIGN_IN_GOOGLE',
            payload: { uid }
        });
    };
};

export const signOutGoogle = () => {
    return (dispatch) => {
        dispatch({
            type: 'SIGN_OUT_GOOGLE'
        });
        history.push('/');
    };
};












// export const NAME = () => {
//
// };