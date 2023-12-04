import { combineReducers } from 'redux';
import customizationReducer from './customizationReducer';
import automationReducer from './postman'; // Adjust the path accordingly

const rootReducer = combineReducers({
  customization: customizationReducer,
  automation: automationReducer,
});

export default rootReducer;
