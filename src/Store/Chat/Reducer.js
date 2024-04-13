import { ADD_CHAT_FAILURE, ADD_CHAT_REQUEST, ADD_CHAT_SUCCESS, CHAT_LIST_FAILURE, CHAT_LIST_REQUEST, CHAT_LIST_SUCCESS, GET_ALL_MESSAGES_FAILURE, GET_ALL_MESSAGES_REQUEST, GET_ALL_MESSAGES_SUCCESS, GET_CHAT_DETAIL_FAILURE, GET_CHAT_DETAIL_REQUEST, GET_CHAT_DETAIL_SUCCESS, POST_MESSAGE_FAILURE, POST_MESSAGE_REQUEST, POST_MESSAGE_SUCCESS } from "./ActionType";

const initialState = {
    chats: [],
    chat: null,
    messages: null,
    message: null,
    loading: false,
    error: null,
}
export const chatReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_ALL_MESSAGES_REQUEST:
        case POST_MESSAGE_REQUEST:
        case ADD_CHAT_REQUEST:
        case CHAT_LIST_REQUEST:
        case GET_CHAT_DETAIL_REQUEST:
            return { ...state, loading: true, error: null };
        case POST_MESSAGE_SUCCESS:
            return { ...state, loading: false, error: null, message: action.payload };
        case GET_ALL_MESSAGES_SUCCESS:
            return { ...state, loading: false, error: null, messages: action.payload };
        case CHAT_LIST_SUCCESS:
            console.log(action.payload);
            return { ...state, loading: false, error: null, chats: action.payload };
        case ADD_CHAT_SUCCESS:
            return { ...state, loading: false, error: null, chat: action.payload };
        case GET_CHAT_DETAIL_SUCCESS:
            return { ...state, loading: false, error: null, chat: action.payload };


        case POST_MESSAGE_FAILURE:
        case GET_ALL_MESSAGES_FAILURE:
        case ADD_CHAT_FAILURE:
        case CHAT_LIST_FAILURE:
        case GET_CHAT_DETAIL_FAILURE:
            return { ...state, loading: false, error: action.payload }


        default:
            return state;
    }

} 