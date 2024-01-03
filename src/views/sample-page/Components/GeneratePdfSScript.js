import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Container,
  Grid,
  CircularProgress,
  Tab,
  Tabs,
  Box,
} from '@mui/material';
import axios from 'axios';
import Editor from '@monaco-editor/react';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const baseUrl = `${process.env.REACT_APP_AUTOMATE}`;

// const countPages = async (file) => {
//   const data = new FormData();
//   data.append('file', file);

//   try {
//     const response = await axios.post(`${baseUrl}/count_pages`, data, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     if (response.status === 200) {
//       return response.data.pages;
//     } else {
//       throw new Error('Failed to count pages');
//     }
//   } catch (error) {
//     console.error('Error counting pages:', error);
//     return 'Unknown';
//   }
// };

const GeneratePdfScript = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generatedScript, setGeneratedScript] = useState(null);
  const [logs, setLogs] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [fileDetails, setFileDetails] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file && file.name.endsWith('.pdf')) {
      setPdfFile(file);

      setFileDetails({
        name: file.name,
        size: `${(file.size / 1024).toFixed(2)} KB`,
        
      });

      const reader = new FileReader();
      reader.onload = (e) => {};
      reader.readAsText(file, 'UTF-8');
    } else {
      setPdfFile(null);
      setFileDetails(null);
      toast.error('Please upload a PDF file.');
      event.target.value = null;
    }
  };

  const handleTabChange = (event, newValue) => {
    if (newValue >= 0 && newValue <= 1) {
      setTabValue(newValue);
    }
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

      const uploadLogResponse = await axios.post(`${baseUrl}/upload_document`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = (progressEvent.loaded / progressEvent.total) * 100;
          setUploadProgress(progress);
        },
      });

      if (uploadLogResponse.status === 200) {
        const uploadResp = uploadLogResponse.data;
        setLogs(uploadResp.splits);

        const generateScriptResponse = await axios.get(`${baseUrl}/generate_document_script`, {
          mode: 'no-cors',
        });
        const scriptData = generateScriptResponse.data;
        console.log(scriptData);
        if (scriptData && scriptData.generated_script) {
          setGeneratedScript(scriptData.generated_script);
          setTabValue(1); // Switch to the "View Generated Script" tab
          toast.success('Script generated successfully!');
        } else {
          toast.error('Failed to retrieve the generated script.');
        }
      } else {
        console.error('Upload failed:', uploadLogResponse);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDropAreaClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFileChange({ target: { files: [file] } });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="xl">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" component="div" style={{ marginBottom: '20px', borderBottom: '2px solid #ccc', paddingBottom: '10px' }}>
          Upload API Document and Generate Script
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
          <input type="file" accept=".pdf" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
        <div
          onClick={handleDropAreaClick}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleDropAreaClick();
            }
          }}
          tabIndex={0}
          onDrop={handleFileDrop}
          onDragOver={handleDragOver}
          style={{
            width: '100%',
            height: '90px',  // Adjusted height to make it smaller
            border: '2px dashed #ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative',
            margin: '0 auto',
            // marginRight: '25%',  // Centering the drop area
          }}
          role="button"
        >

              {loading && (
                <CircularProgress
                  style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                  color="inherit"
                />
              )}
              {!loading && (
                <div style={{ textAlign: 'center' }}>
                  <CloudUploadIcon style={{ fontSize: '3rem', color: '#00cca5' }} />
                  <Typography variant="body1" style={{ marginTop: '10px' }}>
                    {pdfFile ? 'PDF Selected' : 'Drag & Drop or Click to Upload PDF'}
                  </Typography>
                </div>
              )}
            </div>
          </Grid>
          {fileDetails && (
            <Grid item xs={12} style={{ marginTop: '10px' }}>
              <Typography variant="caption" color="textSecondary">
                File: {fileDetails.name || 'Unknown'}, Size: {fileDetails.size || 'Unknown'}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
              sx={{
                width: { xs: '80%', md: '15%' },
                backgroundColor: '#00cca5',
                height: { xs: '6vh', md: '40px' },
                borderRadius: '5px',
                boxSizing: 'border-box',
                marginLeft: { xs: 'auto', md: '0vh' },
                '&:hover': {
                  backgroundColor: '#80e8cc',
                },
              }}
              variant="contained"
              onClick={handleHitTestScript}
              style={{ marginTop: '10px' }}
              disabled={loading || !pdfFile}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Upload File'}
            </Button>
          </Grid>
        </Grid>

        <Box sx={{ marginTop: '20px' }}>
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            {logs && <Tab label="View Document Details" />}
            {generatedScript && <Tab label="View Generated Script" />}
          </Tabs>
        </Box>

        {tabValue === 0 && logs && (
          <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', overflow: 'auto', overflowX: 'auto', overflowY: 'auto' }}>
            {logs.map((section, i) => (
              <div key={i}>
                <Typography variant="h6" gutterBottom>
                  Section {i + 1}
                </Typography>
                <pre>{section}</pre>
              </div>
            ))}
          </Paper>
        )}

        {tabValue === 1 && generatedScript && (
          <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Generated Script
            </Typography>
            <Editor width="100%" height="500px" language="python" value={generatedScript} />
          </Paper>
        )}
      </Paper>
      <ToastContainer position="top-center" />
    </Container>
  );
};

export default GeneratePdfScript;
