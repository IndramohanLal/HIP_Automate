import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Editor from "@monaco-editor/react";
import Paper from "@mui/material/Paper";
import {
  setGenraetedTest,
  setJavascriptCode,
  setAllGeneratedTests
} from "../../../store/postman";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import jsPDF from 'jspdf';
import { IconClipboard, IconCheck } from '@tabler/icons';
 
const baseUrl = `${process.env.REACT_APP_AUTOMATE}`;
 
const TestSideBarButton = () => {
  const dispatch = useDispatch();
  const test_code = useSelector((state) => state.automation.genratedTest);
  const javascriptCode = useSelector((state) => state.automation.javascriptcode);
  const allGeneratedTests = useSelector((state) => state.automation.allGeneratedTests);
  const [pythoncode, setPythonCode] = useState(test_code.trim());
  const [loading, setLoading] = useState(false);
  const [codeType, setCodeType] = useState("python");
  const [showdata, setShowData] = useState(test_code.trim());
  const [selectedResponse, setSelectedResponse] = useState(Object.keys(allGeneratedTests)[0] || "");
  const [isCopied, setIsCopied] = useState(false);
 
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
 
  const handleChangeEditor = (newCode) => {
    const modifiedCode = newCode.trim();
    setPythonCode(modifiedCode);
    dispatch(setGenraetedTest(modifiedCode));
  };
 
  const convertToPython = () => {
    setCodeType("python");
 
    if (selectedResponse) {
      setShowData(allGeneratedTests[selectedResponse] || "");
    } else {
      setShowData(test_code.trim());
    }
  };
 
  const convertToJavascript = async () => {
    try {
      setLoading(true);
 
      const selectedPythonCode = allGeneratedTests[selectedResponse];
 
      if (selectedPythonCode) {
        const response = await axios.post(`${baseUrl}/convert_to_javascript`, {
          code: selectedPythonCode
        });
 
        const responseData = response.data;
        dispatch(setJavascriptCode(responseData));
        setCodeType("javascript");
        setShowData(responseData);
        setLoading(false);
      } else {
        console.error("Invalid Python code selected");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
 
  const handleResponseChange = (event) => {
    const selectedResponse = event.target.value;
    setSelectedResponse(selectedResponse);
    setCodeType("python");
    setShowData(allGeneratedTests[selectedResponse] || "");
  };
 
  const downloadAsPDF = () => {
    if (!showdata) {
      toast.error('No code available for download.');
      return;
    }
 
    const pdf = new jsPDF();
    const lines = showdata.split(/\r?\n/);
    let yPosition = 10;
    pdf.setFontSize(8);
    lines.forEach((line) => {
      pdf.text(line, 10, yPosition);
      yPosition += 5;
      if (yPosition >= pdf.internal.pageSize.height) {
        pdf.addPage();
        yPosition = 10;
      }
    });
    pdf.save('script.pdf');
  };
 
  const copyToClipboard = () => {
    navigator.clipboard.writeText(showdata);
    setIsCopied(true);
 
    // Reset isCopied after 5 seconds
    setTimeout(() => {
      setIsCopied(false);
    }, 5000);
  };
 
  useEffect(() => {
    const fetchGeneratedTests = async () => {
      try {
        const response = await axios.get(`${baseUrl}/get_all_generated_tests`);
        const generatedTests = response.data;
        // console.log(generatedTests);
 
        if (Object.keys(generatedTests).length > 0) {
          dispatch(setAllGeneratedTests(generatedTests));
          setSelectedResponse(Object.keys(generatedTests)[0]);
        } else {
          console.log("No generated tests found");
        }
      } catch (error) {
        console.error("Error fetching generated tests:", error);
      }
    };
 
    fetchGeneratedTests();
  }, [dispatch]);
 
  useEffect(() => {
    if (selectedResponse) {
      setShowData(allGeneratedTests[selectedResponse] || "");
    }
  }, [allGeneratedTests, selectedResponse]);
 
  if (Object.keys(allGeneratedTests).length === 0) {
    return (
      <Box p={2}>
        <Paper elevation={3} style={{ padding: "16px", textAlign: "center" }}>
          <Typography variant="h4">No Generated Tests Found.</Typography>
        </Paper>
      </Box>
    );
  }
 
  return (
    <Box style={{ margin: "5px", display: 'flex', flexDirection: 'column' }}>
      <Grid container justifyContent="space-between">
        <Grid item xs={12} sm={6} >
          <FormControl >
          <InputLabel id="response-select-label">Select Response</InputLabel>
            <Select
              labelId="response-select-label"
              id="response-select"
              value={selectedResponse}
              onChange={handleResponseChange}
              style={{ width: isSmallScreen ? "100%" : "150px", height: '4vh', marginTop:"1vh" }}
            >
              {Object.keys(allGeneratedTests).map((response) => (
                <MenuItem key={response} value={response}>
                  {response}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Button
            sx={{
              backgroundColor: "#00cca5",
              borderRadius: "5px",
              "&:hover": {
                backgroundColor: "#80e8cc"
              }
            }}
            variant="contained"
            onClick={downloadAsPDF}
            style={{ width: isSmallScreen ? "100%" : "auto", marginRight: '10px' }}
          >
            Download as PDF
          </Button>
          <Button
            sx={{
              backgroundColor: "#00cca5",
              borderRadius: "5px",
              "&:hover": {
                backgroundColor: "#80e8cc"
              }
            }}
            variant="contained"
            onClick={codeType === "python" ? convertToJavascript : convertToPython}
            style={{ width: isSmallScreen ? "100%" : "auto" }}
          >
            {codeType === "python" ? "Convert to JavaScript" : "View in Python"}
          </Button>
        </Grid>
      </Grid>
      <Box p={2} style={{ marginTop: '10px', position: "relative" }}>
        {loading && (
          <CircularProgress
            size={100}
          />
        )}
        {!loading && (
          <Editor
            width="100%"
            height="80vh"
            sx={{
              borderRadius: "50px",
            }}
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
        <Button
          sx={{
            backgroundColor: isCopied ? "#00cca5" : "transparent",
            borderRadius: "5px",
            "&:hover": {
              backgroundColor: isCopied ? "#00cca5" : "transparent"
            },
            position: "absolute",
            top: '3.1vh',
            right: '2.8vh',
            zIndex: 1,
            color: isCopied ? "#fff" : "#555",
          }}
          variant="contained"
          onClick={copyToClipboard}
        >
          {isCopied ? (
            <>
              <IconCheck sx={{ marginRight: '4px' }} />
              Copied!
            </>
          ) : (
            <>
              <IconClipboard sx={{ marginRight: '4px' }} />
              Copy Code
            </>
          )}
        </Button>
      </Box>
    </Box>
  );
};
 
export default TestSideBarButton;