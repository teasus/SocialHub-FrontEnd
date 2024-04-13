import { ADD_CHAT_FAILURE, ADD_CHAT_SUCCESS, CHAT_LIST_FAILURE, CHAT_LIST_SUCCESS, GET_ALL_MESSAGES_FAILURE, GET_ALL_MESSAGES_SUCCESS, GET_CHAT_DETAIL_FAILURE, GET_CHAT_DETAIL_REQUEST, GET_CHAT_DETAIL_SUCCESS, POST_MESSAGE_FAILURE, POST_MESSAGE_SUCCESS } from './ActionType';
import { api } from '../../config/api';

export const getAllChats=()=> async (dispatch)=>{
    try {
        const {data}= await api.get("/api/chat/All");
        console.log("get all chats : ", data);
        dispatch({type:CHAT_LIST_SUCCESS,payload : data});
    } catch (error) {
        console.log("catch error : ",error);
        dispatch({type:CHAT_LIST_FAILURE,payload : error.message});
    }
}

export const createNewChat=(withUserId)=> async (dispatch)=>{
    try {
        const {data}= await api.post(`/api/chat/NewChat/${withUserId}`);
       
        console.log("create New Chat : ", data);
        dispatch({type:ADD_CHAT_SUCCESS,payload : data});
    } catch (error) {
        console.log("catch error : ",error);
        dispatch({type:ADD_CHAT_FAILURE,payload : error.message});
    }
}

export const getChatDetailsById=(chatId)=> async (dispatch)=>{
    try {
        const {data}= await api.get(`api/chat/${chatId}`);
        console.log("get all chats : ", data);
        dispatch({type:GET_CHAT_DETAIL_SUCCESS,payload : data});
    } catch (error) {
        console.log("catch error : ",error);
        dispatch({type:GET_CHAT_DETAIL_FAILURE,payload : error.message});
    }
}


export const createAMessage=(data,chatId)=> async (dispatch)=>{
    try {
        const {data}= await api.post(`/api/message/send/${chatId}`,data);
        console.log("create A Message : ", data);
        dispatch({type: POST_MESSAGE_SUCCESS,payload : data});
    } catch (error) {
        console.log("catch error : ",error);
        dispatch({type:POST_MESSAGE_FAILURE,payload : error.message});
    }
}

export const getAllMessages=(chatId)=> async (dispatch)=>{
    try {
        const {data}= await api.get(`/api/message/ChatMessages/${chatId}`);
        console.log("get all chat mewssages : ", data);
        dispatch({type:GET_ALL_MESSAGES_SUCCESS,payload : data});
    } catch (error) {
        console.log("catch error : ",error);
        dispatch({type:GET_ALL_MESSAGES_FAILURE,payload : error.message});
    }
}

