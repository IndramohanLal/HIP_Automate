import React, { useEffect } from "react";
import { Typography } from '@mui/material';
import Editor from '@monaco-editor/react';

const ResponseSidebar = () => {
    const storedDataString = localStorage.getItem("myData");
    console.log(storedDataString)
    let formattedData = null; // Initialize to null

    if (storedDataString !== null) {
        try {
            const parsedData = JSON.parse(storedDataString);
            formattedData = JSON.stringify(parsedData, null, 2);
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
    }

    useEffect(() => {
        const handleBeforeUnload = () => {
            // Clear the data from local storage
            localStorage.removeItem("myData");
        };

        // Attach the event listener
        window.addEventListener("beforeunload", handleBeforeUnload);

        // Clean up the event listener when the component is unmounted
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []); // The empty dependency array ensures that the effect runs only once

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
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                    <Typography
                        sx={{
                            fontFamily: 'monospace',
                            fontSize: '30px',
                            whiteSpace: 'pre-wrap',
                            wordWrap: 'break-word',
                            padding: '10px',
                            backgroundColor: 'white',
                            borderRadius: '10px',
                            color: '#333',
                            marginLeft: '10px',
                            boxShadow: '0 0 30px rgba(0, 0, 0, 0.1)',
                            overflow: 'auto',
                            width: "80%", // Adjust width as needed
                            maxWidth: "500px", // Adjust maxWidth as needed
                            textAlign: "center",
                            fontWeight: "bold",
                        }}
                    >
                        No Response
                    </Typography>
                </div>
            )}
        </div>
    );
};

export default ResponseSidebar;
