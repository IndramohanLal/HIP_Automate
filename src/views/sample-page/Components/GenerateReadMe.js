import React from 'react';
import { Paper, Typography, Container } from '@mui/material';
import { CenterFocusStrong } from '@mui/icons-material';

const GenerateReadMe = () => {
  return (
    <Container maxWidth="xxl">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', overflow: 'auto' }}>
        <Typography variant="h5" gutterBottom>
        </Typography>
        <Typography variant="h5">
          Generation of ReadMe file is in progress...
        </Typography>
      </Paper>
    </Container>
  );
};

export default GenerateReadMe;