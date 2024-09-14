import { createStore } from 'redux';
import timerReducer from './timeReducer';

export const store = createStore(timerReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );
