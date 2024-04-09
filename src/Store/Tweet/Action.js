
import { axios } from 'axios';
import { GET_ALL_TWEETS_REQUEST, GET_ALL_TWEETS_FAILURE, GET_USERS_TWEET_SUCCESS, GET_USERS_TWEET_FAILURE, USER_LIKED_TWEET_SUCCESS, USER_LIKED_TWEET_FAILURE, FIND_TWEET_BY_ID_SUCCESS, FIND_TWEET_BY_ID_FAILURE, TWEET_CREATE_SUCCESS, TWEET_CREATE_FAILURE, REPLY_TWEET_SUCCESS, REPLY_TWEET_FAILURE, RETWEET_SUCCESS, RETWEET_FAILURE, LIKE_TWEET_SUCCESS, LIKE_TWEET_FAILURE, TWEET_DELETE_SUCCESS, TWEET_DELETE_FAILURE, GET_ALL_TWEETS_SUCCESS } from './ActionType';
import { api } from '../../config/api';

export const getAllTweets=()=> async (dispatch)=>{
    try {
        const {data}= await api.get("/api/tweets/");
        console.log("get all tweets : ", data);
        dispatch({type:GET_ALL_TWEETS_SUCCESS,payload : data});
    } catch (error) {
        console.log("catch error : ",error);
        dispatch({type:GET_ALL_TWEETS_FAILURE,payload : error.message});
    }
}

export const getUserTweets=(userId)=> async (dispatch)=>{
    try {
        const {data}= await api.get(`/api/tweets/user/${userId}`);
        console.log("get user tweets : ", data);
        dispatch({type:GET_USERS_TWEET_SUCCESS,payload : data});
    } catch (error) {
        console.log("catch error : ",error);
        dispatch({type:GET_USERS_TWEET_FAILURE,payload : error.message});
    }
}

export const getTweetsLikedByUser=(userId)=> async (dispatch)=>{
    try {
        const {data}= await api.get(`/api/tweets/user/${userId}/likes`);
        console.log("get all user liked tweets : ", data);
        dispatch({type:USER_LIKED_TWEET_SUCCESS,payload : data});
    } catch (error) {
        console.log("catch error : ",error);
        dispatch({type:USER_LIKED_TWEET_FAILURE,payload : error.message});
    }
}

export const findTweetsByID=(tweetId)=> async (dispatch)=>{
    try {
        const {data}= await api.get(`/api/tweets/${tweetId}`);
        console.log("get tweet by id : ", data);
        dispatch({type:FIND_TWEET_BY_ID_SUCCESS,payload : data});
    } catch (error) {
        console.log("catch error : ",error);
        dispatch({type:FIND_TWEET_BY_ID_FAILURE,payload : error.message});
    }
}

export const createTweet=(tweetData)=> async (dispatch)=>{
    try {
        const {data}= await api.post(`/api/tweets/create`,tweetData);
        console.log("Tweet created : ", data);
        dispatch({type:TWEET_CREATE_SUCCESS,payload : data});
    } catch (error) {
        console.log("catch error : ",error);
        dispatch({type:TWEET_CREATE_FAILURE,payload : error.message});
    }
}

export const createTweetReply=(tweetData)=> async (dispatch)=>{
    try {
        const {data}= await api.post(`/api/tweets/reply`,tweetData);
        console.log("Tweet reply created : ", data);
        dispatch({type:REPLY_TWEET_SUCCESS,payload : data});
    } catch (error) {
        console.log("catch error : ",error);
        dispatch({type:REPLY_TWEET_FAILURE,payload : error.message});
    }
}

export const createRetweet=(tweetId)=> async (dispatch)=>{
    try {
        const {data}= await api.put(`/api/tweets/${tweetId}/retweet`);
        console.log("Retweeted : ", data);
        dispatch({type:RETWEET_SUCCESS,payload : data});
    } catch (error) {
        console.log("catch error : ",error);
        dispatch({type:RETWEET_FAILURE,payload : error.message});
    }
}

export const likeTweet=(tweetId)=> async (dispatch)=>{
    try {
        const {data}= await api.post(`/api/${tweetId}/likes`);
        console.log("liked : ", data);
        dispatch({type:LIKE_TWEET_SUCCESS,payload : data});
    } catch (error) {
        console.log("catch error : ",error);
        dispatch({type:LIKE_TWEET_FAILURE,payload : error.message});
    }
}

export const deleteTweet=(tweetId)=> async (dispatch)=>{
    try {
        const {data}= await api.post(`/api/tweets/${tweetId}/deleteTweet`);
        console.log("delted tweet : ", data);
        dispatch({type:TWEET_DELETE_SUCCESS,payload : tweetId});
    } catch (error) {
        console.log("catch error : ",error);
        dispatch({type:TWEET_DELETE_FAILURE,payload : error.message});
    }
}