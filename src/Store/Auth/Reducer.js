import {
    FIND_USER_BY_ID_SUCCESS, FOLLOW_USER_SUCCESS, GET_USER_PROFILE_FAILURE,
    GET_USER_PROFILE_REQUEST, GET_USER_PROFILE_SUCCESS, LOGIN_USER_FAILURE,
    LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT, REGISTER_USER_FAILURE,
    REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, SEARCH_USER_BY_QUERY_FAILURE, SEARCH_USER_BY_QUERY_REQUEST, SEARCH_USER_BY_QUERY_SUCCESS, UPDATE_USER_SUCCESS
} from "./ActionType";

const initialState = {
    user: null,
    jwt: null,
    loading: false,
    error: null,
    search: [],
}
export const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case LOGIN_USER_REQUEST:
        case REGISTER_USER_REQUEST:
        case GET_USER_PROFILE_REQUEST:
        case SEARCH_USER_BY_QUERY_REQUEST:
            return { ...state, loading: true, error: null };
        case LOGIN_USER_SUCCESS:
            return { ...state, loading: false, error: null, jwt: action.payload };
        case REGISTER_USER_SUCCESS:
            return { ...state, loading: false, error: null, jwt: action.payload };
        case GET_USER_PROFILE_SUCCESS:
            return { ...state, loading: false, error: null, user: action.payload };
        case FIND_USER_BY_ID_SUCCESS:
            return { ...state, loading: false, error: null, findUser: action.payload };
        case SEARCH_USER_BY_QUERY_SUCCESS:
            return { ...state, loading: false, error: null, search: action.payload };

        case FOLLOW_USER_SUCCESS:
            return { ...state, loading: false, error: null, findUser: action.payload };

        case UPDATE_USER_SUCCESS:
            return { ...state, loading: false, error: null, user: action.payload, updatedUser: true };
        case LOGIN_USER_FAILURE:
        case REGISTER_USER_FAILURE:
        case GET_USER_PROFILE_FAILURE:
        case SEARCH_USER_BY_QUERY_FAILURE:
            return { ...state, loading: false, error: action.payload }

        case LOGOUT:
            return initialState;
        default:
            return state;
    }

} 