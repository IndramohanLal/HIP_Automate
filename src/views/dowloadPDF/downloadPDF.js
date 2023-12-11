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
        <Paper style={{ textAlign: "right", padding: '20px', margin: '20px', display: 'flex', justifyContent: 'flex-start' }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={downloadAsPDF}>
                        Download as PDF
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <div className="editor-container" style={{ height: '100vh', width: '100vw', overflowX: 'hidden' }}>
                        <Editor width="100%" height="80%" defaultLanguage="python" defaultValue={pythonCode} />
                    </div>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default DataDisplay;
