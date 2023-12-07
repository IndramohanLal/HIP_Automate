import React, { useState } from "react";
import { Button, Paper, Typography, Container, Grid } from "@mui/material";
import axios from "axios"; // Import Axios library

const TestScriptGenerator = () => {
    const [generatedScript, setGeneratedScript] = useState("");
    const [responseText, setResponseText] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/json") {
            const reader = new FileReader();
            reader.onload = (e) => {
                const jsonData = e.target.result;
                setGeneratedScript(jsonData);
            };
            reader.readAsText(file);
        } else {
            setGeneratedScript("");
            alert("Please select a valid .json file.");
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
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
                        <Typography
                            variant="h5"
                            component="div"
                            style={{
                                marginBottom: "20px",
                                borderBottom: "2px solid #3f51b5",
                                paddingBottom: "10px",
                                fontFamily: 'Arial, Helvetica, sans-serif',
                                fontWeight: 'bold',
                                color: 'black',
                                textAlign: 'left',
                                letterSpacing: '0.5px',
                            }}
                        >
                            Test Script Generator
                        </Typography>

                        <input
                            type="file"
                            accept=".json"
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
                                Generate Test Script
                            </Button>
                            <h2 style={{ marginTop: "10px" }}>{responseText}</h2>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};
export default TestScriptGenerator;
