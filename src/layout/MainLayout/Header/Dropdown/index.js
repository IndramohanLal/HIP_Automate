import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import "./Dropdown.css"

let apps = ["Select Category", "HIP Automate", "Interact with PDF", "Interact with URL", "CCDA Summarization", "Business Intelligence"]

export default function Dropdown() {
  const [product, setProduct] = useState(apps[0]);

  const handleChange = (event) => {
    setProduct(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 150, }} size="small">
      <Select
        className="dropdown_container"
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={product}
        onChange={handleChange}
      >
        {apps.map((app) => (
          <MenuItem key={app} value={app}>
            {app}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

  );
}