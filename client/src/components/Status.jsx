import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const Category = ({ filterStatus, status, setFilterStatus }) => {
  const handleStatusChange = (product) => {
    setFilterStatus(product.target.value);
  };

  return (
    <FormControl variant="outlined" fullWidth >
      <InputLabel id="status-label">Choose your mode</InputLabel>
      <Select
        labelId="status-label"
        id="status-select"
        multiple
        
        value={filterStatus}
        onChange={handleStatusChange}
        label="Choose Mode"
        renderValue={(selected) => selected.join(", ")}
      >
        {status.map((status) => (
          <MenuItem key={status} value={status}>
            {status}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Category;