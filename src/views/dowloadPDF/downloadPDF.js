import React, { useState } from 'react';
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
            alert('No Python code available for download.');
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
        <MainCard style={{ position: 'relative' }}>
            <ToastContainer></ToastContainer>
            <Container maxWidth="xl">
                <Paper style={{ padding: '5px', margin: '20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                            <Button variant="contained" color="primary" onClick={downloadAsPDF} sx={{ marginLeft: 'auto' }}>
                                Download as PDF
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Box className="editor-container" sx={{ height: '70vh', width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
                                <Editor width="100%" height="100%" defaultLanguage="python" defaultValue={pythonCode} />
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </MainCard>
    );
};

export default DataDisplay;
