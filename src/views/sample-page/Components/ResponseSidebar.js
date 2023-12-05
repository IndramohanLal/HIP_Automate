import {
    Drawer,
    Typography,
} from '@mui/material';

const ResponseSidebar = () => {
    const storedDataString = localStorage.getItem("myData");
    let parsedData = null;

    try {
        parsedData = JSON.parse(storedDataString);
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
                    backgroundColor: '#f5f5f5',
                    borderRadius: '10px',
                    color: '#333',
                    marginLeft: '10px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                    overflow: 'auto',
                    maxHeight: '80vh',
                }}
            >
                {parsedData ? JSON.stringify(parsedData, null, 2) : "Invalid JSON format"}
            </Typography>
        </div>
    );
};

export default ResponseSidebar;
