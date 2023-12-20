import React, { useState, useEffect } from "react";
import { Button, Paper, Typography, Container, Grid, CircularProgress } from "@mui/material";
import axios from "axios";
import TestResults from './TestResults';

const baseUrl = `${process.env.REACT_APP_AUTOMATE}`;

const GeneratePdfScript = () => {
    const [pdfFile, setPdfFile] = useState(null);
    const [testResultsLists, setTestResultsLists] = useState({ errors: [], failed_tests: [], success_tests: [] });
    const [loading, setLoading] = useState(false);
    const [fileContent, setFileContent] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setPdfFile(file);

        // Read the content of the uploaded file
        const reader = new FileReader();
        reader.onload = (e) => {
            setFileContent(e.target.result);
        };
        reader.readAsText(file, 'UTF-8');
    };

    const handleHitTestScript = async () => {
        try {
            if (!pdfFile) {
                alert("Please select a PDF file.");
                return;
            }
            setLoading(true);
            const formData = new FormData();
            formData.append("file", pdfFile);

            const response = await axios.post(`${baseUrl}/upload_test_script`, formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });
            const responseData = response.data;
            setTestResultsLists({ ...responseData });
            setResponseText(JSON.stringify(responseData, null, 2));
            setForceRerender((prev) => !prev);
        } catch (error) {
            setResponseText(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="xl">
          <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
            <Typography
              variant="h5"
              component="div"
              style={{
                marginBottom: "20px",
                borderBottom: "2px solid #ccc",
                paddingBottom: "10px",
              }}
            >
              Run Your Script
            </Typography>
    
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  sx={{
                    width: { xs: "80%", md: "15%" },
                    backgroundColor: "#00cca5",
                    height: { xs: "6vh", md: "40px" },
                    borderRadius: "5px",
                    boxSizing: "border-box",
                    marginLeft: { xs: "auto", md: "0vh" },
                    "&:hover": {
                      backgroundColor: "#80e8cc",
                    },
                  }}
                  variant="contained"
                  onClick={handleHitTestScript}
                  style={{ marginTop: "10px" }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Run Script'}
                </Button>
              </Grid>
            </Grid>
    
            <Grid container spacing={2} style={{ marginTop: "20px" }}>
              {testResultsLists &&
                testResultsLists.success_tests.length +
                  testResultsLists.failed_tests.length > 0 && (
                  <Grid item xs={12}>
                    <TestResults
                      key={testResultsLists.timestamp}
                      testResultsLists={testResultsLists}
                    />
                  </Grid>
                )}
            </Grid>

            {/* Display the content of the uploaded file */}
            {/* {fileContent && (
                <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
                    <Typography variant="h6" gutterBottom>
                        Uploaded File Content
                    </Typography>
                    <Typography>
                        {fileContent}
                    </Typography>
                </Paper>
            )} */}
          </Paper>
        </Container>
    );
};

export default GeneratePdfScript;
