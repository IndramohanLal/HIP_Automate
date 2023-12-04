import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

let titles = {
  Average_Code_Generation_Time: 'Average Code Generation Time',
  Negative_Test_Cases: 'Negative Test Cases',
  Passes_Test_Cases: 'Passed Test Cases',
  Total_API_Tests: 'Total API Tested',
  Average_API_Response_Time: 'Average API Response Time'
};
export default function BasicCard({ data }) {
  function formatNumber(number) {
    // Check if the number has no decimal places
    if (Number.isInteger(number)) {
      return number.toString(); // Convert it to a string to keep it as-is
    } else {
      return number.toFixed(2); // Otherwise, round to 2 decimal places
    }
  }

  return (
    <Card sx={{ minWidth: 275, background: 'inherit' }}>
      <CardContent>
        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
          {titles[data.key]}
        </Typography>
        <Typography variant="h3" component="div">
          {formatNumber(data.value)}
        </Typography>
      </CardContent>
    </Card>
  );
}
