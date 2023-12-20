// mySlice.js
import { createSlice } from '@reduxjs/toolkit';
// import { actions } from 'react-table';

const AutomationSlice = createSlice({
  name: 'AutomationSlice',
  initialState: {
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
    url: '',
    isLoggedin:false,
    responseData:"",
    pdfData:[],
    negativeTests:""
  },
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
    setIsLoggedIn:(state,action)=>{
      state.isLoggedin = action.payload
    },
    setResponseData:(state,action)=>{
          state.responseData=action.payload
    },
    
    setPdfData:(state,action)=>{
      state.responseData=action.payload
    },
    setNegativeTc:(state,action)=>{
      state.negativeTests=action.payload
    }
  }
});

export const { setAuthToken, setHeaderData, setParamsdata, setBodyContentType, setBodyContent, setGenraetedTest, setTestUrl ,setIsLoggedIn,setResponseData,setPdfData,setNegativeTc} = AutomationSlice.actions;
export const selectParamsData = (state) => state.Automation.paramsdata;

export default AutomationSlice.reducer;
