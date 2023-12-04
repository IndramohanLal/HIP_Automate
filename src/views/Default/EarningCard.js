import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function BasicCard({ data }) {
  return (
    <Card sx={{ minWidth: 275, background: "inherit" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {data.title}
        </Typography>
        <Typography variant="h3" component="div">
          {data.stat}
        </Typography>
        <Typography variant="h6" component="div">
          {data.fluctuation}
        </Typography>
      </CardContent>
    </Card>
  );
}
