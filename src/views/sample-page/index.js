// material-ui
import Editor from '@monaco-editor/react';
import { Divider, Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Stack } from '@mui/system';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Resizable } from 're-resizable';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGenraetedTest, setNegativeTc, setNegativeTestresult, setTestResult, setTestUrl } from 'store/postman';
import {setResponseData} from 'store/postman'
import swal from 'sweetalert';
import { ToastContainer, toast } from 'react-toastify';
import MainCard from 'ui-component/cards/MainCard';
import { Authorization } from './Components/Authorization';
import { Body } from './Components/Body';
import { Headers } from './Components/Headers';
import KeyValueTable from './Components/Params';
import TestResults from './Components/TestResults';
import 'react-toastify/dist/ReactToastify.css';
import './Components/common.css';
import { green } from '@mui/material/colors';
const Theme = createTheme({
  palette: {
    primary: {
      main: '#00cca5'
    }
  }
});
const baseUrl = `${process.env.REACT_APP_AUTOMATE}`;
const user_id = localStorage.getItem('user_id');
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}
function a11yProps1(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const getStatusMessage = (statusCode) => {
  switch (statusCode) {
    case 200:
      return 'OK';
    case 201:
      return 'Created';
    case 204:
      return 'No Content';
    case 400:
      return 'Bad Request';
    case 401:
      return 'Unauthorized';
    case 403:
      return 'Forbidden';
    case 404:
      return 'Not Found';
    case 500:
      return 'Internal Server Error';
    case 502:
      return 'Bad Gateway';
    case 503:
      return 'Service Unavailable';
    default:
      return '';
  }
};

const SamplePage = () => {
  const [displaySummary, setDisplaySummary] = useState(false);
  const [loadingOverlay, setLoadingOverlay] = useState(false);
  const [enableRunTest, setEnableRunTest] = useState(false);
  const [url, setUrl] = useState('');
  const [value, setValue] = useState(0);
  const [value1, setValue1] = useState(0);
  const [requestType, setRequestType] = useState('GET');

  const bodydata = useSelector((state) => state.automation.bodyContent);
  const contentType = useSelector((state) => state.automation.bodyContentType);
  const headerData = useSelector((state) => state.automation.headerData);
  const paramsdata = useSelector((state) => state.automation.paramsdata);
  const authorization = useSelector((state) => state.automation.authToken);
  const test_code = useSelector((state) => state.automation.genratedTest);
  const negativeTests = useSelector((state) => state.automation.negativeTests);
  const dispatch = useDispatch();
  const [testResults, seTestResults] = useState(null);
  // const [testResultsLists, seTestResultsLists] = useState({ errors: [], failed_tests: [], success_tests: [] });
  const [height, setHeight] = useState('50vh');
  const [responseBody, setResponseBody] = useState('');

  const [validUrl, setValidUrl] = useState(true);
  const [isHovered, setHovered] = useState(false);
  const [forceRerender, setForceRerender] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [res,setRes] = useState(negativeTests);
  const [code, setCode] = useState(test_code);
  const [originalCode, setOriginalCode] = useState(useSelector((state) => state.automation.genratedTest));
  // console.log(originalCode)
  // console.log(test_code)
  const [addFaultyTestCasesClicked, setAddFaultyTestCasesClicked] = useState(false);
  const [showFaultyTestTab,setShowFaultyTestTab]=useState(false);
  const [isRequestEditable, setIsRequestEditable] = useState(true);//  Indra
  const storedUrl = useSelector((state) => state.automation.url);
  const [enableRequestDropdown, setEnableRequestDropdown] = useState(true);
  const testResult = useSelector((state) => state.automation.testResult);
  const negativeTestResult=useSelector((state) => state.automation.negativeTestResult);
  const [ng,setNg]=useState("")
  const [showbutton, setShowButton] = useState("");

  const [status, setStatus] = useState("")
  const [responseMessages, setResponseMessages] = useState('');

  const changeFaultyTestCase=(newCodee)=>{
    setRes(newCodee)
  }

  useEffect(() => {
    setUrl(storedUrl || '');
    // setOriginalCode(test_code);
  }, [code,storedUrl,dispatch,ng,res]);
  


 
  const  handleRunFaultyTestCasesClick=async()=>{
    let resp;
    if(url!='')
    {
    setLoadingOverlay(true);
    try {
      // console.log("faultyTestCaseResult!!!!!!!!!")
      resp = await axios.post(`${baseUrl}/run_dynamic_tests`,{
        generated_code:res
      })
      // console.log(resp)
      // console.log(resp.data)
      // dispatch(setTestResult(resp.data));
      dispatch(setNegativeTestresult(resp.data))
      setForceRerender((prev) => !prev);
      seTestResultsLists({ ...resp.data});
      // console
      setNg(resp.data.summary)
      // setValue(6);
      setLoadingOverlay(false);
    } catch (error) {
      console.error('Error making the request:', error);
      setLoadingOverlay(false);
    }
  }
    
  }

  const handleAddFaultyTestCasesClick = async () => {
    
  //  setShowButton("Negative Tests")
    let resp;

    if(url!='')
    {
    setLoadingOverlay(true);
    try {
      // console.log("_____________!!!!!!!!!")
      resp = await axios.post(`${baseUrl}/generate_test`,{ 
        api_url: url,
        http_method: requestType,
        content_type: 'json',} )
      setRes(resp.data.generated_code);
      // console.log(resp.data.generated_code)
      dispatch(setNegativeTc(resp.data.generated_code))
      setValue(5);
      setLoadingOverlay(false);
    } catch (error) {
      console.error('Error making the request:', error);
      setLoadingOverlay(false);
    }
  }
  };
  
  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeeditor = (newCode) => {

    // const modifiedCode = newCode.replace(/\/\/\s*/g, '# ');
    setCode(newCode);
    dispatch(setGenraetedTest(newCode));

  };

  const handleSend = async () => {
    // dispatch(setGenraetedTest(""))
    // dispatch(setNegativeTc(""))
    // console.log(code)
    // console.log(originalCode)
    // console.log(originalCode)
    if (code !== originalCode) {
      const confirm = window.confirm("Previous script data will be lost. Are you sure you want to send the request?");
      if (confirm) { 
        dispatch(setGenraetedTest(''));
        setCode(''); 
        setOriginalCode('');
        // console.log(test_code)
        // console.log(code)
      } else {
        return;
      }
    }
 
    if (url.trim().length === 0) {
      return;
    }
    let content_type;
    let request_body;
    if (contentType === 1) {
      content_type = 'form-data';
    } else {
      content_type = bodydata.raw.type;
      request_body = bodydata.raw.data;
    }

    let fromData = bodydata.fromData;
    let selectedFormData = fromData.filter((item) => item.selected);
    let selectedHeadersdata = headerData.filter((item) => item.selected);
    let selectedparams = paramsdata.filter((item) => item.selected);
    let param_keys = selectedparams.map((item) => item.key);
    let param_values = selectedparams.map((item) => item.value);
    let header_keys = selectedHeadersdata.map((item) => item.key);
    let header_values = selectedHeadersdata.map((item) => item.value);
    let form_keys = selectedFormData.map((item) => item.key);
    let form_types = selectedFormData.map((item) => item.type);
    let form_values = selectedFormData.map((item) => (item.type === 'text' ? item.value : item.file));
    let resp;

    setLoadingOverlay(true);
    // console.log("Request BOdy : ", request_body)
    // console.log("test_code :", res)
    // console.log("test_code :", code)
    try {
      resp = await axios.post(`${baseUrl}/explore_api_and_generate_test`, {
        user_id: user_id,
        api_url: url,
        http_method: requestType,
        content_type: 'json',
        form_keys,
        form_types,
        form_values,
        header_keys,
        header_values,
        param_keys,
        param_values,
        Authorization: authorization,
        request_body,
        test_code: showbutton === "Negative Tests" ? res : code,
        // test_code:code

      });
      // console.log(test_code)
      // consolelog("QFEeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
      // console.log(resp)
      // console.log(resp.data.result);
      setStatus(resp.status)
      setResponseMessages(getStatusMessage(resp.status));
      dispatch(setGenraetedTest(resp.data.test_code));
      dispatch(setTestResult(resp.data.result));
      setIsRequestEditable(false);
      setCode(resp.data.test_code);
      
      setResponseBody(resp.data.code_content);
      localStorage.setItem("myData", resp.data.code_content);
      dispatch(setResponseData(resp.data.code_content));
      setLoadingOverlay(false);
      setForceRerender((prev) => !prev);
      setValue(4);
      seTestResultsLists({ ...resp.data.result });
      setDisplaySummary(true);
      
    
      // console.log(resp);
      localStorage.setItem("myData", resp.data.code_content);

      
    
      toast.success('Request sent successfully!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      });
    } catch (e) {
      console.error(e);
      setResponseBody(e.response.data.code_content);
      let message = e.response.data.error;
      toast.error(message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      });
      setLoadingOverlay(false);
    }
  }

  const r=useSelector((state)=>state.automation.responseData)
  localStorage.setItem("res", r);
  let re=localStorage.getItem("res")

 if (re !== null) {
  try {
    const parsedData = JSON.parse(re);
    re = JSON.stringify(parsedData, null,  2);
  } catch (error) {
      console.error("Error parsing JSON:", error);
  }
}
  useEffect(() => {
      localStorage.removeItem("res");

  }, []);
  useEffect(() => {
    const handleBeforeUnload = () => {
        localStorage.removeItem("myData");
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
    };
}, []); 
  const handleConfirmation = (confirm) => {
    setShowConfirmation(false);

    if (confirm) {
      runTest();
    }
  };

  // const runTest = async () => {
  //   try {
  //     const response = await axios.post(`${baseUrl}/run_test`, { user_id });
  //     dispatch(setTestResult(response.data));//indra2
  //     seTestResultsLists({ ...response.data });
  //     console.log(testResultsLists);
  //     console.log(response);
  //     setValue1(2);
  //   } catch (error) {
  //     console.error('Error making the request:', error);
  //   }
  //   setDisplaySummary(true);
  // };
  const handleChangeType = (event) => {
    setRequestType(event.target.value);
  };
  const handleUrlChange = (event) => {
    const newUrl = event.target.value;

    dispatch(setTestUrl(newUrl));
    setIsRequestEditable(true);
    setCode("")
    setRes("")
    setUrl(newUrl);
    dispatch(setTestResult(""))
    dispatch(setNegativeTestresult(""))
    setValidUrl(newUrl.startsWith('https://') || newUrl.startsWith('http://'));

    const isUrlChanged = newUrl.trim() !== storedUrl.trim();
    setEnableRequestDropdown(isUrlChanged);
  };
  const handleChange1 = (event, newValue) => {
    setValue1(newValue);
  };
  const getColorForOption = (selectedOption) => {
    switch (selectedOption) {
      case 'GET':
        return 'green';
      case 'POST':
        return 'orange';
      case 'PUT':
        return 'blue';
      case 'PATCH':
        return 'purple';
      case 'DELETE':
        return 'red';
      default:
        return 'black';
    }
  };
  useEffect(() => { }, [height]);
  const openInNewWindow = async () => {
    let resp;
    try {
      resp = await axios.post(`${baseUrl}/send_report`, { user_id });
    } catch (e) {
      console.log(e);
    }
    seTestResults(resp.data);
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(testResults);
      newWindow.document.close();
    } else {
      alert('Your browser blocked the pop-up window. Please allow pop-ups for this site.');
    }
  };
 
  return (
    <MainCard style={{ position: 'relative' }}>
      <ToastContainer></ToastContainer>
      <Stack direction="row">
        <select
          value={requestType}
          onChange={handleChangeType}
          disabled={!enableRequestDropdown}//Indra
          style={{
            width: '10%',
            height: '6vh',
            borderRight: 'none',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            borderRadius: '5px 0px 0px 5px',
            fontWeight: '600',
            border: '1px solid #787878',
            color: getColorForOption(requestType)
          }}
        >
          <option value="GET" style={{ color: 'green', fontWeight: '600' }}>
            GET
          </option>
          <option value="POST" style={{ color: 'orange', fontWeight: '600' }}>
            POST
          </option>
          <option value="PUT" style={{ color: 'blue', fontWeight: '600' }}>
            PUT
          </option>
          <option value="PATCH" style={{ color: 'purple', fontWeight: '600' }}>
            PATCH
          </option>
          <option value="DELETE" style={{ color: 'red', fontWeight: '600' }}>
            DELETE
          </option>
        </select>

        <input
          type="text"
          value={url}
          onChange={handleUrlChange}
          placeholder="Enter Url"
          style={{
            width: '76%',
            height: '6vh',
            borderLeft: 'none',
            outline: 'none',
            borderRadius: '0px 5px 5px 0px',
            paddingLeft: '15px',
            border: validUrl ? '1px solid #787878' : '1px solid red'
          }}
        />
        {validUrl ? null : <div style={{ color: 'red', marginLeft: '10px' }}>Invalid URL</div>}

        <Button
          sx={{
            width: '10%',
            backgroundColor: '#00cca5',
            height: '6vh',
            borderRadius: '5px',
            boxSizing: 'border-box',
            marginLeft: '2vh',
            '&:hover': {
              backgroundColor: '#80e8cc'
            }
          }}
          variant="contained"
          onClick={handleSend}
        >
          Send
        </Button>
      </Stack>
      <Resizable
        enable={{
          top: false,
          right: false,
          bottom: true,
          left: false,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false
        }}
        handleClasses={{
          bottom: 'pointer-events-none'
        }}
        minHeight={51}
        onResize={(e, direction, ref, d) => {
          setHeight(`calc(${ref.style.height} - 40px)`);
        }}
      >
        <ThemeProvider theme={Theme}>
          <Box
            sx={{
              width: '100%',
              height: { height }
            }}
          >
            <Box sx={{ marginLeft: '0.7%', borderBottom: 1, borderColor: 'divider', padding: '10', width: '97%' }}>
            <Tabs value={value} onChange={(event, newValue) => handleChange(event, newValue)} aria-label="basic tabs example">
            <Tab sx={{ padding: '2vh', fontSize: '11px' }} label="Params" {...a11yProps(0)} onClick={()=>{setShowButton("Params")}} />
            <Tab sx={{ padding: '2vh', fontSize: '11px' }} label="Authorization" {...a11yProps(1)} onClick={()=>{setShowButton("Authorization")}} />
            <Tab sx={{ padding: '2vh', fontSize: '11px' }} label="Headers" {...a11yProps(2)} onClick={()=>{setShowButton("Headers")}} />
            <Tab sx={{ padding: '2vh', fontSize: '11px' }} label="Body" {...a11yProps(3)} onClick={()=>{setShowButton("Body")}}  />
          <Tab sx={{ padding: '2vh', fontSize: '11px' }} label="Tests" {...a11yProps(4)} onClick={()=>{setShowButton("Tests")}} />

        {  code != "" && <Tab sx={{ padding: '2vh', fontSize: '11px' }} label="Negative Tests" {...a11yProps(5)} onClick={()=>{setShowButton("Negative Tests")}} /> }
           
          {/* { code!='' && (
           <Button
           sx={{
             padding: '2vh',
             paddingLeft:"2vh",
             fontSize: '11px',
             marginLeft: '86.4vh',
             marginTop:"1vh",
             width: '11%',
             height: '4vh',
             borderRadius: '5px',
             boxSizing: 'border-box',
             variant: "contained",
             backgroundColor: '#00cca5',
             color: '#000',
             '&:hover': {
               backgroundColor: '#80e8cc',
             }
           }}
           label="Add Faulty Test Cases"
           {...a11yProps(5)}
           onClick={handleAddFaultyTestCasesClick}
         >
           Add Faulty Test Cases
         </Button>
          )         
              } */}

          </Tabs>
              </Box>
            <CustomTabPanel sx={{ padding: '0px' }} value={value} index={0}>
              <KeyValueTable
                setUrl={setUrl}
                url={url}
                onSelectedParamsChange={(selectedParams) => setAppendedata(selectedParams)}
                height={height}
              />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <Authorization height={height}></Authorization>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <Headers height={height}></Headers>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3} style={{ height: '35vh' }}>
              <Body height={height}></Body>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
              <div className="editor-container" style={{ overflowX: 'hidden' }}>
              <Editor
                key={forceRerender}
                height={height}
                width="100%"
                defaultLanguage="python"
                value={code}
          
                options={{
                formatOnType: true,
                formatOnPaste: true,
                lineHeight: 20,
                minimap: {
                  enabled: false              
                },
                

                language: {
                  comments: {
                   lineComment: '#',
                  },
                },
                }}
                onChange={handleChangeeditor}
              />

              </div>{' '}
              
       
            </CustomTabPanel>
            <CustomTabPanel value={value} index={5}>
            {showbutton=="Negative Tests"  && ( <Button
            sx={{
              width: { xs: '100%', sm: '50%', md: '30%', lg: '20%', xl: '15%' },
              backgroundColor: '#00cca5',
              height: '4vh',
              borderRadius: '5px',
              boxSizing: 'border-box',
              marginTop: '-2vh',
              marginLeft: { xs: '0%', sm: '25%', md: '35%', lg: '80%', xl: '85%' },
              color: '#fff',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#80e8cc'
              }
            }}
            variant="contained"
            onClick={handleAddFaultyTestCasesClick}
          >
            Add Test Cases
          </Button>

              )}

            {showbutton=="Negative Tests" && res!=''  && ( <Button
                        sx={{
                          width: { xs: '100%', sm: '50%', md: '30%', lg: '20%', xl: '15%' },
                          backgroundColor: '#00cca5',
                          height: '4vh',
                          borderRadius: '5px',
                          boxSizing: 'border-box',
                          marginTop: '1vh',
                          marginLeft: { xs: '0%', sm: '25%', md: '35%', lg: '80%', xl: '85%' },
                          color: '#fff',
                          textTransform: 'none',
                          '&:hover': {
                            backgroundColor: '#80e8cc'
                          }
                        }}
                        variant="contained"
                        onClick={handleRunFaultyTestCasesClick}
                      >
                        Run Test
                      </Button>

                          )}
            <div className="editor-container" style={{ overflowX: 'hidden' }}>
                  <Editor
                   key={forceRerender}
                   height={height}
                    // height="50vh"
                    width="100%"
                    defaultLanguage="python"
                    value={res}
                    onChange={changeFaultyTestCase}
                    options={{
                      formatOnType: true,
                      formatOnPaste: true,
                      minimap: {
                        enabled: false              
                      },
      
                      language: {
                        comments: {
                         lineComment: '#',
                        },
                      },
                      }}
                  />
                  </div>
              </CustomTabPanel>
          </Box>
        </ThemeProvider>
      </Resizable>

      <Paper sx={{ position: 'relative' }}>
        <Divider className={isHovered ? 'glowOnHover' : ''} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}></Divider>
        <ThemeProvider theme={Theme}>
          {loadingOverlay && <LinearProgress style={{ height: '2px' }} />}

          <Box
            sx={{
              marginLeft: '0.7%',
              width: '97%',
              position: 'relative',
              bottom: '0',
              // height:'70vh',
              minHeight:"200px",
            }}
          >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value1} onChange={handleChange1} aria-label="basic tabs example">
                <Tab sx={{ padding: '2vh', fontSize: '11px' }} label="Response" {...a11yProps1(0)} />
                <Tab sx={{ padding: '2vh', fontSize: '11px' }} label="Header" {...a11yProps1(1)} />
                <Tab sx={{ padding: '2vh', fontSize: '11px' }} label="Test Results" {...a11yProps1(2)} />
                <Typography
                  sx={{
                          padding: '2vh', fontSize: '13px',
                          marginLeft: 'auto',
                          marginRight: '2vw',
                          textAlign: 'center',
                          '@media screen and (max-width: 600px)': {
                            marginLeft: '2vw',
                          },
                          '@media screen and (max-width: 400px)': {
                            marginLeft: '1vw',
                          },
                      }}

                  > {status===200 ? (<span style={{color:"green"}}>{status}  {responseMessages}</span>):( <span>{status}  {responseMessages}</span>) } 
                 
                  </Typography>
              </Tabs>
            </Box>
            <CustomTabPanel value={value1} index={0}>
              {!loadingOverlay && (
                <div className="editor-container">
                <Editor
                  key={forceRerender}
                  height="50vh"
                  width="100%"
                  defaultLanguage="json"
                  defaultValue={re}
                  options={{
                    formatOnType: true,
                    formatOnPaste: true,
                    minimap: {
                      enabled: false
                    }
                  }}
                />
                </div> 
            
              )}
            </CustomTabPanel>
            <CustomTabPanel value={value1} index={1}>
              {!loadingOverlay && <h3>No Data</h3>}
            </CustomTabPanel>
            <CustomTabPanel value={value1} index={2}>
           
            {showbutton!=="Negative Tests" && <TestResults key={forceRerender} testResultsLists={testResult}></TestResults>}
           {/* {console.log(testResult)}
           {console.log('negativeTestResult',negativeTestResult)} */}
             {showbutton==="Negative Tests" && <TestResults key={forceRerender} testResultsLists={negativeTestResult}></TestResults> }
               {/* }  */}
               {/* {showbutton==="Negative Tests" && {ng} }  */}
              {/* {ng} */}
            </CustomTabPanel>
            <CustomTabPanel value={value1} index={3}>
              {!loadingOverlay && <div></div>}
            </CustomTabPanel>
          </Box>
        </ThemeProvider>
      </Paper>
    </MainCard>
  );
};

export default SamplePage;
