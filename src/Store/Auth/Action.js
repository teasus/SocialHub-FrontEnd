import axios from "axios"
import { API_BASE_URL, api } from "../../config/api";
import { FIND_USER_BY_ID_FAILURE, FIND_USER_BY_ID_SUCCESS, FOLLOW_USER_FAILURE, FOLLOW_USER_SUCCESS, GET_USER_PROFILE_FAILURE, GET_USER_PROFILE_SUCCESS, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT, REGISTER_USER_FAILURE, REGISTER_USER_SUCCESS, SEARCH_USER_BY_QUERY_FAILURE, SEARCH_USER_BY_QUERY_SUCCESS, UPDATE_USER_FAILURE, UPDATE_USER_SUCCESS } from "./ActionType";
import { useDispatch } from 'react-redux';


export const loginUser = (loginData) => async (dispatch) => {

    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData);
        console.log("log in user : ", data);

        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);
        }

        dispatch({ type: LOGIN_USER_SUCCESS, payload: data.jwt });

    } catch (error) {
        console.log(error);
        dispatch({ type: LOGIN_USER_FAILURE, payload: error.message });
    }
}


export const registerUser = (registerData) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, registerData);
        console.log("Sign up user : ", data);

        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);
        }

        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.jwt });

    } catch (error) {
        console.log(error);
        dispatch({ type: REGISTER_USER_FAILURE, payload: error.message });
    }
}

export const getUserProfile = (jwt) => async (dispatch) => {
    try {
        const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        });
        



        dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: data });

    } catch (error) {
        console.log(error);
        dispatch({ type: GET_USER_PROFILE_FAILURE, payload: error.message });
    }
}

export const logout = () => async (dispatch) => {


    localStorage.removeItem("jwt");
    dispatch({ type: LOGOUT, payload: null });

}

export const findUserById = (userId) => async (dispatch) => {
    try {
        const { data } = await api.get(`/api/users/${userId}`);
        dispatch({type:FIND_USER_BY_ID_SUCCESS,payload:data});

    } catch (error) {
        console.log("error ", error);
        dispatch({ type: FIND_USER_BY_ID_FAILURE, payload: error.message });
    }
}

export const updateUserProfile = (reqData) => async (dispatch) => {
    try {
        const { data } = await api.put(`/api/users/update`,reqData);
        console.log("updated user profile ", data);
        dispatch({type:UPDATE_USER_SUCCESS,payload:data});

    } catch (error) {
        console.log("error ", error);
        dispatch({ type: UPDATE_USER_FAILURE, payload: error.message });
    }
}

export const followUserAction = (userId) => async (dispatch) => {
    try {
        const { data } = await api.put(`/api/users/${userId}/follow`);
        console.log("Followed user ", data);
        dispatch({type:FOLLOW_USER_SUCCESS,payload:data});

    } catch (error) {
        console.log("error ", error);
        dispatch({ type: FOLLOW_USER_FAILURE, payload: error.message });
    }
}

export const searchUserQuery = (query) => async (dispatch) => {
    try {
        const { data } = await api.get(`/api/users/searchUser?Query=${query}`);
        console.log(" search User ", data);
        
        dispatch({type:SEARCH_USER_BY_QUERY_SUCCESS,payload:data});

    } catch (error) {
        console.log("error ", error);
        dispatch({ type: SEARCH_USER_BY_QUERY_FAILURE, payload: error.message });
    }
}