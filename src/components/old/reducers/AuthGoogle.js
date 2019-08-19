
const INITIAL_STATE = {
    GoogledIn: null,
    uid: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SIGN_IN_GOOGLE':
            return { ...state,
                GoogledIn: true,
                uid: action.payload.uid,
            };
        case 'SIGN_OUT_GOOGLE':
            return { ...state,
                GoogledIn: false,
                uid: null,
            };
        default:
            return state;
    }
};