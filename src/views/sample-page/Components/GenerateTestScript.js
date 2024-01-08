import React, { useState } from 'react';
import {
  Button,
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
import 'react-toastify/dist/ReactToastify.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const baseUrl = `${process.env.REACT_APP_AUTOMATE}`;

const TestScriptGenerator = () => {
  const [jsonFile, setJsonFile] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generatedScript, setGeneratedScript] = useState(null);
  const [logs, setLogs] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.name.endsWith('.json')) {
      setJsonFile(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        const fileSize =
          file.size > 1024
            ? Math.round(file.size / 1024) + 'KB'
            : file.size + 'B';
        setFileInfo({ name: file.name, size: fileSize });
      };
      reader.readAsText(file, 'UTF-8');
    } else {
      setJsonFile(null);
      setFileInfo(null);
      alert('Please upload a JSON file.');
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
      // console.log('uploadLogResponse')
      if (!jsonFile) {
        alert('Please select a JSON file.');
        return;
      }
      setLoading(true);
      const formData = new FormData();
      formData.append('file', jsonFile);

      const uploadLogResponse = await axios.post(`${baseUrl}/upload_log`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // console.log('uploadLogResponse',uploadLogResponse)

      if (uploadLogResponse.status === 200) {
        setLogs(uploadLogResponse.data);

        const generateScriptResponse = await axios.get(`${baseUrl}/generate_log_script`, {
          mode: 'no-cors',
        });
        const scriptData = generateScriptResponse.data;
        setTabValue(1);

        setGeneratedScript(scriptData.Generated_Script.join('\n\n'));
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
    document.getElementById('jsonFileInput').click();
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFileChange({ target: { files: [file] } });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // ... (previous code)

return (
    <Container maxWidth="xl">
         <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" component="div" style={{ marginBottom: '20px', borderBottom: '2px solid #ccc', paddingBottom: '10px' }}>
          Upload API Document and Generate Script
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <input
              type="file"
              accept=".json"
              id="jsonFileInput"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
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
                height: '140px', // Adjusted height to make it smaller
                border: '2px dashed #ccc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
                margin: '0 auto',
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
                    {jsonFile && fileInfo ? (
                      <span>{`File: ${fileInfo.name}, Size: ${fileInfo.size}`}</span>
                    ) : (
                      <span style={{font:"20px"}}>
                        Drag & Drop <br/>or{' '}<br/>
                        <Button
                          variant="contained"
                          disabled={loading}
                          sx={{
                            height: '25px',
                            fontSize: '0.9rem',
                            textTransform: 'none',
                            color: '#fff',
                            backgroundColor: loading ? '#9e9e9e' : '#00cca5',
                            '&:hover': {
                              backgroundColor: loading ? '#9e9e9e' : '#80e8cc',
                            },
                          }}
                        >
                          Click To Browse
                        </Button>
                      </span>
                    )}
                  </Typography>
                </div>
              )}
            </div>
          </Grid>
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
              disabled={loading || !jsonFile}
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
          <TabPanel value={tabValue} index={0}>
            {logs && (
              <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant="h6" gutterBottom>
                  Log Details
                </Typography>
                <pre>{JSON.stringify(logs, null, 2)}</pre>
              </Paper>
            )}
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            {generatedScript && (
              <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant="h6" gutterBottom>
                  Generated Script
                </Typography>
                <Editor
                  width="100%"
                  height="500px"
                  language="python"
                  value={generatedScript}
                  options={{ readOnly: false, lineNumbers: 'on' }}
                />
              </Paper>
            )}
          </TabPanel>
        </Box>
      </Paper>
  
      {/* Display File Name and Size */}
      {/* {jsonFile && fileInfo && (
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Uploaded File Information
          </Typography>
          <Typography variant="body1">{`File Name: ${fileInfo.name}`}</Typography>
          <Typography variant="body1">{`File Size: ${fileInfo.size}`}</Typography>
        </Paper>
      )} */}
    </Container>
  );
  
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

export default TestScriptGenerator;