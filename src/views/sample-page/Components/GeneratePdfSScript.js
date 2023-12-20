import React, { useState } from 'react';
import { Button, Paper, Typography, Container, Grid, CircularProgress, Tab, Tabs, Box } from '@mui/material';
import axios from 'axios';
import Editor from '@monaco-editor/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseUrl = `${process.env.REACT_APP_AUTOMATE}`;

const GeneratePdfScript = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generatedScript, setGeneratedScript] = useState(null);
  const [logs, setLogs] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.name.endsWith('.pdf')) {
      setPdfFile(file);

      const reader = new FileReader();
      reader.onload = (e) => {};
      reader.readAsText(file, 'UTF-8');
    } else {
      setPdfFile(null);
      toast.error('Please upload a PDF file.');
      event.target.value = null;
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

  const handleTabChange = (event, newValue) => {
    if (newValue >= 0 && newValue <= 1) {
      setTabValue(newValue);
    }
  };

  return (
    <Container maxWidth="xl">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" component="div" style={{ marginBottom: '20px', borderBottom: '2px solid #ccc', paddingBottom: '10px' }}>
          Upload API Document and Generate Script
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <input type="file" accept=".pdf" onChange={handleFileChange} style={{ width: '100%' }} />
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
              disabled={loading || !pdfFile}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Upload File'}
            </Button>
          </Grid>
        </Grid>

        <Box sx={{ marginTop: '20px' }}>
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            {logs && <Tab label="View Log Details" />}
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
