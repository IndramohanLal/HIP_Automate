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
import { setGenraetedTest, setTestUrl } from 'store/postman';
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

const SamplePage = () => {
  const [displaySummary, setDisplaySummary] = useState(false);
  const [loadingOverlay, setLoadingOverlay] = useState(false);
  const [enableRunTest, setEnableRunTest] = useState(false);
  const [url, setUrl] = useState('');
  const [value, setValue] = useState(0); // Add this line to initialize the 'value' state
  const [value1, setValue1] = useState(0);
  const [requestType, setRequestType] = useState('GET');

  const bodydata = useSelector((state) => state.automation.bodyContent);
  const contentType = useSelector((state) => state.automation.bodyContentType);
  // const res=useSelector((state)=>state.automation.responseData)
  const headerData = useSelector((state) => state.automation.headerData);
  const paramsdata = useSelector((state) => state.automation.paramsdata);
  const authorization = useSelector((state) => state.automation.authToken);
  const test_code = useSelector((state) => state.automation.genratedTest);
  console.log("$$$$$$$$$$$$$$$")
  console.log(test_code)
  const dispatch = useDispatch();
  const [testResults, seTestResults] = useState(null);
  const [testResultsLists, seTestResultsLists] = useState({ errors: [], failed_tests: [], success_tests: [] });
  const [height, setHeight] = useState('40vh');
  const [responseBody, setResponseBody] = useState('');

  const [validUrl, setValidUrl] = useState(true);
  const [isHovered, setHovered] = useState(false);
  const [forceRerender, setForceRerender] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [res,setRes] = useState('');
  const [code, setCode] = useState(test_code);
  const [originalCode, setOriginalCode] = useState(test_code);
  const [addFaultyTestCasesClicked, setAddFaultyTestCasesClicked] = useState(false);
  const [showFaultyTestTab,setShowFaultyTestTab]=useState(false);
  const [isRequestEditable, setIsRequestEditable] = useState(true);//  Indra
  const storedUrl = useSelector((state) => state.automation.url);
  const [enableRequestDropdown, setEnableRequestDropdown] = useState(true);
  const showFaultyTC=()=>{
    setShowFaultyTestTab(true)
  }

  const handleAddFaultyTestCasesClick = async () => {
    try {
      const response = await axios.get('YOUR_API_ENDPOINT');
      setRes(response.data);
    } catch (error) {
      console.error('Error making the request:', error);
    }
    setAddFaultyTestCasesClicked(true);
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

    const modifiedCode = newCode.replace(/\/\/\s*/g, '# ');

    setCode(modifiedCode);
    // dispatch(setGenraetedTest(modifiedCode));
    // setCode(newCode);
    //Indramohan code
    dispatch(setGenraetedTest(newCode));

  };

  useEffect(() => {
    setOriginalCode(test_code);
  }, [code]);

  // sendReq=()=>{
  //   // return <h1>4f3</h1>
  // }

  const handleSend = async () => {
    dispatch(setTestUrl(url));
    console.log(code)
    console.log(originalCode)
    if (code !== originalCode) {
      const confirm = window.confirm("Previous script data will be lost. Are you sure you want to send the request?");
      if (confirm) {
        dispatch(setGenraetedTest('')); 
        setCode(''); 
        setOriginalCode(''); 
      } else {
        // User canceled the action
        return;
      }
    }
  
    // The rest of your existing code here...
  
    // Additional steps to execute when code !== originalCode
 
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
        test_code: code
      });

      dispatch(setGenraetedTest(resp.data.test_code));
      setIsRequestEditable(false);//Indra

      setCode(resp.data.test_code);
      setResponseBody(resp.data.code_content);
      console.log(resp.data.code_content)
      localStorage.setItem("myData", resp.data.code_content);
      dispatch(setResponseData(resp.data.code_content))
      // setRes(useSelector((state)=>state.automation.responseData))
      setLoadingOverlay(false);
      setForceRerender((prev) => !prev);
      setValue(4);
      seTestResultsLists({ ...resp.data.result });
      setDisplaySummary(true);

      console.log(resp);
      localStorage.setItem("myData", resp.data.code_content);

      // Success toast
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
      // Error toast
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
  };

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
        // Clear the data from local storage
        localStorage.removeItem("myData");
    };

    // Attach the event listener
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clean up the event listener when the component is unmounted
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

  const runTest = async () => {
    try {
      const response = await axios.post(`${baseUrl}/run_test`, { user_id });

      seTestResultsLists({ ...response.data });
      console.log(testResultsLists);
      console.log(response);
      setValue1(2);
    } catch (error) {
      console.error('Error making the request:', error);
      // Handle error as needed
    }
    setDisplaySummary(true);
  };
  const handleChangeType = (event) => {
    setRequestType(event.target.value);
  };
  const handleUrlChange = (event) => {
    const newUrl = event.target.value;
    setIsRequestEditable(true);
    // Regular expression for URL validatio

    setUrl(newUrl); // Update the input field
    setValidUrl(newUrl.startsWith('https://') || newUrl.startsWith('http://')); // Check if the new URL is valid

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
        return 'black'; // Default color
    }
  };
  // const resData = useSelector((state) => state.automation.responseData); 
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
  const [showCombinedInput, setShowCombinedInput] = useState(false);
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
            color: getColorForOption(requestType) // Function to get color based on the selected value
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
          // disabled={!isRequestEditable}//Indra
          style={{
            width: '76%',
            height: '6vh',
            borderLeft: 'none',
            outline: 'none',
            borderRadius: '0px 5px 5px 0px',
            paddingLeft: '15px',
            border: validUrl ? '1px solid #787878' : '1px solid red' // Change the border color based on URL validity
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
              backgroundColor: '#80e8cc' // Change the color on hover
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
            <Tab sx={{ padding: '2vh', fontSize: '11px' }} label="Params" {...a11yProps(0)}   onClick={() => setShowFaultyTestTab(false)} />
            <Tab sx={{ padding: '2vh', fontSize: '11px' }} label="Authorization" {...a11yProps(1)}    onClick={() => setShowFaultyTestTab(false)}/>
            <Tab sx={{ padding: '2vh', fontSize: '11px' }} label="Headers" {...a11yProps(2)}   onClick={() => setShowFaultyTestTab(false)} />
            <Tab sx={{ padding: '2vh', fontSize: '11px' }} label="Body" {...a11yProps(3)}   onClick={() => setShowFaultyTestTab(false)}  />
          <Tab sx={{ padding: '2vh', fontSize: '11px' }} label="Tests" {...a11yProps(4)}  onClick={showFaultyTC}   />
          
          { showFaultyTestTab && (
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
             color: '#000',  // Set the text color to black
             '&:hover': {
               backgroundColor: '#80e8cc', // Change the color on hover
             }
           }}
           label="Add Faulty Test Cases"
           {...a11yProps(5)}
           onClick={handleAddFaultyTestCasesClick}
         >
           Add Faulty Test Cases
         </Button>
          )         
              }

          {/* <Button
          sx={{
            width: '10%',
            backgroundColor: '#00cca5',
            height: '6vh',
            borderRadius: '5px',
            boxSizing: 'border-box',
            marginLeft: '2vh',
            '&:hover': {
              backgroundColor: '#80e8cc' // Change the color on hover
            }
          }}
          variant="contained"
          onClick={handleSend}
        >
          Send
        </Button> */}

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
              {/* {
                enableRunTest &&
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <button onClick={runTest} className="genrate_button">
                    Run Test
                  </button>
                </div>
              } */}
              {/* <textarea
                value={test_code}
                style={{ width: '97%', height: height, border: 'none', outline: 'none', resize: 'none' }}
                placeholder="Enter raw data"
              ></textarea> */}
              <div className="editor-container" style={{ overflowX: 'hidden' }}>
              <Editor
                key={forceRerender}
                height={height}
                width="100%"
                defaultLanguage="python"
                defaultValue={code}
                options={{
                formatOnType: true,
                formatOnPaste: true,
                minimap: {
                  enabled: false              
                },
                // Additional editor options
                language: {
                  comments: {
                   lineComment: '#',  // Adjust this line based on your language
                  },
                },
                }}
                onChange={handleChangeeditor}
              />

              </div>{' '}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={5}>
                {addFaultyTestCasesClicked && (
                  <Editor
                    height="50vh"
                    width="100%"
                    defaultLanguage="json"
                    defaultValue={res}
                    options={{
                      formatOnType: true,
                      formatOnPaste: true,
                      minimap: {
                        enabled: false
                      }
                    }}
                  />
                )}
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
              bottom: '0'
            }}
          >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value1} onChange={handleChange1} aria-label="basic tabs example">
                <Tab sx={{ padding: '2vh', fontSize: '11px' }} label="Response" {...a11yProps1(0)} />
                <Tab sx={{ padding: '2vh', fontSize: '11px' }} label="Header" {...a11yProps1(1)} />
                <Tab sx={{ padding: '2vh', fontSize: '11px' }} label="Test Results" {...a11yProps1(2)} />
              </Tabs>
            </Box>
            {/* {loadingOverlay && ( */}

            {/* )} */}
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
              {/* {displaySummary && <button
                onClick={() => {
                  openInNewWindow(testResults);
                }}
                className="genrate_button"
              >
                Display Summary
              </button>} */}
              <TestResults key={forceRerender} testResultsLists={testResultsLists}></TestResults>
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
