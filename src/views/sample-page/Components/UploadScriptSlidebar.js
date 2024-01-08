import React, { useState } from 'react';
import { Button, Paper, Typography, Container, Grid, CircularProgress } from '@mui/material';
import axios from 'axios';
import TestResults from './TestResults';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const baseUrl = `${process.env.REACT_APP_AUTOMATE}`;

const GeneratePdfScript = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [testResultsLists, setTestResultsLists] = useState({ errors: [], failed_tests: [], success_tests: [] });
  const [loading, setLoading] = useState(false);
  const [fileContent, setFileContent] = useState(null);

  const handleFileChange = (file) => {
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
        alert('Please select a PDF file.');
        return;
      }
      setLoading(true);
      const formData = new FormData();
      formData.append('file', pdfFile);

      const response = await axios.post(`${baseUrl}/upload_test_script`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const responseData = response.data;
      setTestResultsLists({ ...responseData });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    handleFileChange(droppedFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="xl">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" component="div" style={{ marginBottom: '20px', borderBottom: '2px solid #ccc', paddingBottom: '10px', color: '#00cca5' }}>
          Run Your Script
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} onDrop={handleDrop} onDragOver={handleDragOver}>
            <div
              style={{
                width: '100%',
                height: '140px',
                border: '2px dashed #ccc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
                margin: '0 auto',
              }}
            >
              {loading && (
                <CircularProgress style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} color="inherit" />
              )}
              {!loading && (

                <div style={{ textAlign: 'center' }}>
                    <CloudUploadIcon style={{ fontSize: '3rem', color: '#00cca5' }} />
                  <Typography variant="body1" style={{ marginTop: '10px' }}>
                    {pdfFile ? (
                      <span>{`File: ${pdfFile.name}, Size: ${(pdfFile.size / 1024).toFixed(2)} KB`}</span>
                    ) : ( <>
                      <span style={{font:"20px"}}>
                        Drag & Drop <br/>or{' '}<br/>
                        </span>
                        <Button variant="contained"  onClick={() => document.getElementById('fileInput').click()} style={{ backgroundColor: '#00cca5', height: '25px',textTransform: 'none'}}>
                          Click To Browse
                        </Button>
                        </>
                    )}
                  </Typography>
                </div>
              )}
            </div>
          </Grid>
          <Grid item xs={12}>
            <input type="file" accept=".pdf" id="fileInput" style={{ display: 'none' }} onChange={(e) => handleFileChange(e.target.files[0])} />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleHitTestScript}
              style={{ marginTop: '10px', backgroundColor: '#00cca5', '&:hover': { backgroundColor: '#80e8cc' } }}
              disabled={loading || !pdfFile}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Run Script'}
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={2} style={{ marginTop: '20px' }}>
          {testResultsLists && testResultsLists.success_tests.length + testResultsLists.failed_tests.length > 0 && (
            <Grid item xs={12}>
              <TestResults key={testResultsLists.timestamp} testResultsLists={testResultsLists} />
            </Grid>
          )}
        </Grid>

        {/* Display the content of the uploaded file */}
        {/* {fileContent && (
          <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Uploaded File Content
            </Typography>
            <Typography>{fileContent}</Typography>
          </Paper>
        )} */}
      </Paper>
    </Container>
  );
};

export default GeneratePdfScript;
