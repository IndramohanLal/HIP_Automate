import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Editor from "@monaco-editor/react";
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
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const baseUrl = `${process.env.REACT_APP_AUTOMATE}`;

const TestSideBarButton = () => {
  const dispatch = useDispatch();
  const test_code = useSelector((state) => state.automation.genratedTest);
  const javascriptCode = useSelector((state) => state.automation.javascriptcode);
  const allGeneratedTests = useSelector((state) => state.automation.allGeneratedTests);  // Update to use Redux state
  const [pythoncode, setPythonCode] = useState(test_code.trim());
  const [loading, setLoading] = useState(false);
  const [codeType, setCodeType] = useState("python");
  const [showdata, setShowData] = useState(test_code.trim());
  const [selectedResponse, setSelectedResponse] = useState(Object.keys(allGeneratedTests)[0] || "");

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
  
      // Get the Python code associated with the selected response
      const selectedPythonCode = allGeneratedTests[selectedResponse];
  
      // Make sure there is a valid Python code
      if (selectedPythonCode) {
        const response = await axios.post(`${baseUrl}/convert_to_javascript`, {
          code: selectedPythonCode  // Use the selected Python code instead of test_code
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
    setCodeType("python"); // Switch back to Python view when a response is selected
    setShowData(allGeneratedTests[selectedResponse] || "");  // Use Redux state instead of local state
  };

  // useEffect(() => {
  //   // Fetch the generated tests when the component mounts
  //   const fetchGeneratedTests = async () => {
  //     try {
  //       const response = await axios.get(`${baseUrl}/get_all_generated_tests`);
  //       const generatedTests = response.data;
  //       console.log(generatedTests)
  //       dispatch(setAllGeneratedTests(generatedTests));
  //     } catch (error) {
  //       console.error("Error fetching generated tests:", error);
  //     }
  //   };

  //   // Call the fetchGeneratedTests method
  //   fetchGeneratedTests();
  // }, [dispatch]);

  // useEffect(() => {
  //   // Set the initial Python code when the component mounts or selectedResponse changes
  //   if (selectedResponse) {
  //     setShowData(allGeneratedTests[selectedResponse] || "");
  //   }
  // }, [allGeneratedTests, selectedResponse]);

  useEffect(() => {
    // Fetch the generated tests when the component mounts
    const fetchGeneratedTests = async () => {
      try {
        const response = await axios.get(`${baseUrl}/get_all_generated_tests`);
        const generatedTests = response.data;
        console.log(generatedTests);

        // Check if generatedTests is not empty before updating the state
        if (Object.keys(generatedTests).length > 0) {
          dispatch(setAllGeneratedTests(generatedTests));
          setSelectedResponse(Object.keys(generatedTests)[0]); // Set default response
        } else {
          console.log("No generated tests found");
        }
      } catch (error) {
        console.error("Error fetching generated tests:", error);
      }
    };

    // Call the fetchGeneratedTests method
    fetchGeneratedTests();
  }, [dispatch]);

  useEffect(() => {
    // Set the initial Python code when the component mounts or selectedResponse changes
    if (selectedResponse) {
      setShowData(allGeneratedTests[selectedResponse] || "");
    }
  }, [allGeneratedTests, selectedResponse]);

  if (Object.keys(allGeneratedTests).length === 0) {
    return (
      <Paper elevation={3} style={{ padding: "16px", margin: "16px", textAlign: "center" }}>
        <Typography variant="h4">No generated tests found.</Typography>
      </Paper>
    );
  }

  return (
    <>
      <FormControl style={{ marginRight: "2vh" }}>
        <InputLabel id="response-select-label">Select Response</InputLabel>
        <Select
          labelId="response-select-label"
          id="response-select"
          value={selectedResponse}
          onChange={handleResponseChange}
        >
          {Object.keys(allGeneratedTests).map((response) => (  // Use Redux state instead of local state
            <MenuItem key={response} value={response}>
              {response}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        sx={{
          width: "auto",
          backgroundColor: "#00cca5",
          height: "4vh",
          borderRadius: "5px",
          boxSizing: "border-box",
          marginLeft: "137vh",
          "&:hover": {
            backgroundColor: "#80e8cc"
          }
        }}
        variant="contained"
        color="secondary"
        onClick={codeType === "python" ? convertToJavascript : convertToPython}
      >
        {codeType === "python" ? "Convert to JavaScript" : "View in Python"}
      </Button>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh", overflowX: "hidden" }}
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
