import React from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Editor from '@monaco-editor/react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MainCard from 'ui-component/cards/MainCard';
import { ToastContainer, toast } from 'react-toastify';

const DataDisplay = () => {
    const pythonCode = useSelector((state) => state.automation.genratedTest);

    const downloadAsPDF = () => {
        if (!pythonCode) {
            toast.error('No Python code available for download.');
            return;
        }

        const pdf = new jsPDF();
        const lines = pythonCode.split(/\r?\n/);
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

    return (
        <>
            <ToastContainer></ToastContainer>
            <Container maxWidth="xl">
                <Paper style={{ padding: '5px', margin: '0px' }}>
                    <Grid container spacing={2}>
                        {pythonCode && (
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                <Button variant="contained" onClick={downloadAsPDF} 
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
                                    }}>
                                    Download as PDF
                                </Button>
                            </Grid>
                        )}
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                            {pythonCode ? (
                                <Box className="editor-container" sx={{ height: '70vh', width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
                                    <Editor width="100%" height="100%" defaultLanguage="python" defaultValue={pythonCode} />
                                </Box>
                            ) : (
                                <Typography variant="body1" color="textSecondary" align="center">
                                    Nothing to download.
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </>
    );
};

export default DataDisplay;
