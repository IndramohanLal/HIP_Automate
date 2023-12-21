import React, { useState } from 'react';
import { Button, Paper, Typography, Container, Grid, CircularProgress, Tab, Tabs, Box } from '@mui/material';
import axios from 'axios';
import Editor from '@monaco-editor/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseUrl = `${process.env.REACT_APP_AUTOMATE}`;

const TestScriptGenerator = () => {
    const [jsonFile, setJsonFile] = useState(null);
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
            };
            reader.readAsText(file, 'UTF-8');
        } else {
            setJsonFile(null);
            toast.error('Please upload a JSON file.');
            event.target.value = null;
        }
    };

    const handleHitTestScript = async () => {
        try {
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

            if (uploadLogResponse.status === 200) {
                setLogs(uploadLogResponse.data);

                const generateScriptResponse = await axios.get(`${baseUrl}/generate_log_script`, {
                    mode: 'no-cors',
                });
                const scriptData = generateScriptResponse.data;

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

    const handleTabChange = (event, newValue) => {
        if (newValue >= 0 && newValue <= 1) {
            setTabValue(newValue);
        }
    };

    return (
        <Container maxWidth="xl">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant="h5" component="div" style={{ marginBottom: '20px', borderBottom: '2px solid #ccc', paddingBottom: '10px' }}>
                    Upload API Log and Generate Script
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <input type="file" accept=".json" onChange={handleFileChange} style={{ width: '100%' }} />
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
                                <Editor width="100%" height="500px" language="python" value={generatedScript} />
                            </Paper>
                        )}
                    </TabPanel>
                </Box>
            </Paper>
            <ToastContainer position="top-center" />
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
