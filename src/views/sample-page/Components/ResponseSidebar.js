import React from "react";
import { Typography } from '@mui/material';

const ResponseSidebar = () => {
    const storedDataString = localStorage.getItem("myData");
    let formattedData = "Invalid JSON format";

    try {
        const parsedData = JSON.parse(storedDataString);
        formattedData = JSON.stringify(parsedData, null, 2);
    } catch (error) {
        console.error("Error parsing JSON:", error);
    }

    return (
        <div>
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
        </div>
    );
};

export default ResponseSidebar;
