import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import gameReducer from './gameReducer'
import highScoreReducer from './highScoreReducer'
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form'



let reducers = combineReducers({
    gameData: gameReducer,
    highScoreData: highScoreReducer,
    form: formReducer
});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

//let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.__store__ = store;
export default store;



