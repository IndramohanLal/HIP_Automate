import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Editor from "@monaco-editor/react";
import {
  setGenraetedTest,
  setJavascriptCode
} from "../../../store/postman";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const baseUrl = `${process.env.REACT_APP_AUTOMATE}`;

const TestSideBarButton = () => {
  const dispatch = useDispatch();
  const test_code = useSelector((state) => state.automation.genratedTest);
  const javascriptCode = useSelector(
    (state) => state.automation.javascriptcode
  );
  const [pythoncode, setPythonCode] = useState(test_code.trim());
  const [loading, setLoading] = useState(false);
  const [codeType, setCodeType] = useState("python");
  const [showdata, setShowData] = useState(test_code.trim());

  const handleChangeEditor = (newCode) => {
    const modifiedCode = newCode.trim();
    setPythonCode(modifiedCode);
    dispatch(setGenraetedTest(modifiedCode));
  };

  const convertToPython = () => {
    setCodeType("python");
  };

  const convertToJavascript = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${baseUrl}/convert_to_javascript`, {
        code: test_code
      });

      const responseData = response.data;
      dispatch(setJavascriptCode(responseData));
      setCodeType("javascript");
      setShowData(responseData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };


  useEffect(() => {
    if (codeType === "python") {
      setShowData(pythoncode);
    } else {
      setShowData(javascriptCode);
    }
  }, [codeType, pythoncode, javascriptCode]);

  return (
    <>
      <Button
        variant="contained"
        sx={{
          width: 'auto',
          backgroundColor: '#00cca5',
          height: '4vh',
          borderRadius: '5px',
          boxSizing: 'border-box',
          marginLeft: '2vh',
          '&:hover': {
            backgroundColor: '#80e8cc'
          }
        }}
        onClick={convertToPython}
      >
        Convert to Python
      </Button>
      <Button
        sx={{
          width: 'auto',
          backgroundColor: '#00cca5',
          height: '4vh',
          borderRadius: '5px',
          boxSizing: 'border-box',
          marginLeft: '2vh',
          '&:hover': {
            backgroundColor: '#80e8cc' // Change the color on hover
          }
        }}
        variant="contained"
        color="secondary"
        onClick={convertToJavascript}
      >
        Convert to JavaScript
      </Button>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh", overflowX: "hidden"}}
      >
        {loading && (
          <CircularProgress
            size={100} // Adjust the size as needed for responsiveness
          />
        )}
        {!loading && (
          <Editor
            width="100%"
            height="100%"
            language={codeType}
            value={showdata}
            options={{
              formatOnType: true,
              formatOnPaste: true,
              minimap: {
                enabled: false
              },
              language: {
                comments: {
                  lineComment: "#"
                }
              }
            }}
            onChange={handleChangeEditor}
          />
        )}
      </Grid>
    </>
  );
};

export default TestSideBarButton;
