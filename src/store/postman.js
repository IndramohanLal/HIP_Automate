// mySlice.js
import { createSlice } from '@reduxjs/toolkit';
// import { actions } from 'react-table';

const initialState = {
  // Your initial state goes here
  paramsdata: [{ key: '', value: '', selected: false }],
  authToken: '',
  headerData: [{ key: '', value: '', selected: false }],
  bodyContentType: 0,
  bodyContent: {
    fromData: [{ key: '', value: '', selected: false, type: 'text', file: null }],
    raw: { type: "json", data: '' },
    binary: null
  },
  genratedTest: '',
  javascriptcode: '',
  url: '',
  testResult: '',
  isLoggedin: false,
  responseData: "",
  negativeTests:"",
  negativeTestResult:""
};

const AutomationSlice = createSlice({
  name: 'AutomationSlice',
  initialState,
  reducers: {
    // Define your actions and reducers here
    setParamsdata: (state, action) => {
      state.paramsdata = action.payload.map((item) => ({ ...item }));
    },

    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
    setHeaderData: (state, action) => {
      state.headerData = action.payload.map((item) => ({ ...item }));
    },
    setBodyContentType: (state, action) => {
      state.bodyContentType = action.payload;
    },
    setBodyContent: (state, action) => {
      state.bodyContent = action.payload;
    },
    setGenraetedTest: (state, action) => {
      state.genratedTest = action.payload;
    },
    setTestUrl: (state, action) => {
      state.url = action.payload;
    },
    setJavascriptCode: (state, action) => {
      state.javascriptcode = action.payload;
    },
    setIsLoggedIn:(state,action)=>{
      state.isLoggedin = action.payload
    },
    setResponseData:(state,action)=>{
          state.responseData=action.payload
    },
    setTestResult:(state,action)=>{
      state.testResult=action.payload
    },
    
    resetState: () => initialState,

    setNegativeTc:(state,action)=>{
      state.negativeTests=action.payload
    },
    setNegativeTestresult:(state,action)=>{
      state.negativeTestResult=action.payload
    },
  }
});

export const { setAuthToken, setHeaderData, setParamsdata, setBodyContentType, setBodyContent, setGenraetedTest, setTestUrl , setJavascriptCode, setIsLoggedIn, setResponseData, setTestResult,resetState,setNegativeTc,setNegativeTestresult  } = AutomationSlice.actions;
export const selectParamsData = (state) => state.Automation.paramsdata;

export default AutomationSlice.reducer;
