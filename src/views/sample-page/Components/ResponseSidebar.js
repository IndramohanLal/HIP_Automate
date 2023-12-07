import React, { useEffect } from "react";
import { Typography } from '@mui/material';

const ResponseSidebar = () => {
    const storedDataString = localStorage.getItem("myData");
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
        <div >
            {formattedData !== null ? (
                <Typography
                    sx={{
                        fontFamily: 'monospace',
                        fontSize: '14px',
                        whiteSpace: 'pre-wrap',
                        wordWrap: 'break-word',
                        padding: '10px',
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        color: '#333',
                        marginLeft: '10px',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                        overflow: 'auto',
                        maxHeight: '80vh',
                    }}
                >
                    {formattedData}
                </Typography>
            ) : (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }} >
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
