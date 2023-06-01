// redux/store.js
import { createStore, combineReducers } from 'redux';
import { excelDataReducer } from './reducers';

const rootReducer = combineReducers({
  excelData: excelDataReducer,
});

const store = createStore(rootReducer);

export default store;
