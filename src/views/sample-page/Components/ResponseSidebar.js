import React, { useEffect } from "react";
import { Typography, Paper } from '@mui/material';
import Editor from '@monaco-editor/react';
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from 'react-redux';


 
const ResponseSidebar = () => {
    const responseData = useSelector((state) => state.automation.responseData);


    let formattedData = null; 
 
    if (responseData !== null) {
        try {
            const parsedData = JSON.parse(responseData);
            formattedData = JSON.stringify(parsedData, null, 2);
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
    }
 
    
 
    return (
        <div>
            {formattedData !== null ? (
                <Typography>
                    <div className="editor-container" style={{ height: '100vh', width: '100vw', overflowX: 'hidden' }}>
                        <Editor
                            width="100%"
                            height="100%"
                            defaultLanguage="json"  // Change 'JSON' to 'json'
                            defaultValue={formattedData}
                            options={{
                                formatOnType: true,
                                formatOnPaste: true,
                                minimap: {
                                    enabled: false
                                }
                            }}
                        />
                    </div>
                </Typography>
            ) : (
                // <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width: "100%", maxWidth: "100%" }}>
                <Box p={2}>
                <Paper elevation={3} style={{ padding: "16px", textAlign: "center" }}>
                  <Typography variant="h4">No Response Available</Typography>
                </Paper>
              </Box>
            )}
        </div>
    );
};
 
export default ResponseSidebar;