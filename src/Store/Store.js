import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/Reducer";
import { tweetReducer } from "./Tweet/Reducer";
import { chatReducer } from "./Chat/Reducer";


const rootReducers = combineReducers({

    auth:authReducer,
    tweet:tweetReducer,
    chats:chatReducer,

});

export const store = legacy_createStore(rootReducers,applyMiddleware(thunk));
