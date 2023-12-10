import React, { useState } from "react";
import { Button, Paper, Typography, Container } from "@mui/material";
import axios from "axios"; // Import Axios library

const GeneratePdfScript = () => {
    const [generatedScript, setGeneratedScript] = useState("");
    const [responseText, setResponseText] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            const reader = new FileReader();
            reader.onload = (e) => {
                const pdfData = e.target.result;
                setGeneratedScript(pdfData);
            };
            reader.readAsText(file);
            setResponseText("");  // Reset responseText when a new file is selected
        } else {
            setGeneratedScript("");
            setResponseText("");
            alert("Please select a valid PDF file.");
        }
    };

    const handleHitTestScript = async () => {
        try {
            const response = await axios.get("https://reqres.in/api/users?page=2");
            setResponseText(JSON.stringify(response.data, null, 2));
        } catch (error) {
            setResponseText(`Error: ${error.message}`);
        }
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} style={{ padding: "20px", marginTop: "20px", marginLeft: "-180px", marginRight: "-100px" }}>
                <Typography
                    variant="h5"
                    component="div"
                    style={{
                        marginBottom: "20px",
                        borderBottom: "2px solid #3f51b5",
                        paddingBottom: "10px",
                        fontFamily: 'Arial, Helvetica, sans-serif', // Change font family
                        fontWeight: 'bold', // Set font weight to bold
                        color: 'black', // Change text color to a dark pink
                        textAlign: 'left', // Center the text
                        letterSpacing: '0.5px', // Add letter spacing
                    }}
                >
                    Test Script Generator
                </Typography>


                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    style={{ marginBottom: "10px" }}
                />
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleHitTestScript}
                        style={{ marginTop: "10px", height: "40px" }}
                    >
                       Upload Script
                    </Button>
                    <h2 style={{ marginTop: "10px" }}>{responseText}</h2>
                </div>
            </Paper>
        </Container>
    )

}
export default GeneratePdfScript