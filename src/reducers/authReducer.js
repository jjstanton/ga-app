import { SIGN_IN, SIGN_OUT} from '../actions/types';

const INITIAL_STATE = {
    isSignedIn: null,
    userId: null,
    userName: null,
    userEmail: null,
    userImage: null
};

export default ( state = INITIAL_STATE, action ) => {
    switch (action.type){
        case SIGN_IN:
            return { ...state,
                isSignedIn: true,
                userId: action.payload.userId,
                userName: action.payload.userName,
                userEmail: action.payload.userEmail,
                userImage: action.payload.userImage
            };
        case SIGN_OUT:
            return { ...state,
                isSignedIn: false,
                userId: null,
                userName: null,
                userEmail: null,
                userImage: null
            };
        default:
            return state;
    }
};

