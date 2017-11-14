import { combineReducers } from 'redux';
import valuesReducer from './reducer-values';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  response: valuesReducer,
  form: formReducer
});

export default rootReducer;