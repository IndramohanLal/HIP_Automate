import React from 'react';
import { Paper, Typography, Container } from '@mui/material';

const GenerateReadMe = () => {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', overflow: 'auto' }}>
        <Typography variant="h5" gutterBottom>
        </Typography>
        <Typography variant="h5">
          This is a test Generate ReadMe text.
        </Typography>
      </Paper>
    </Container>
  );
};

export default GenerateReadMe;