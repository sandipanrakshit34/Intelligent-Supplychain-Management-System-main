import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const Category = ({ filterCategory, category, setFilterCategory }) => {
  const handleCategoryChange = (product) => {
    setFilterCategory(product.target.value);
  };

  return (
    <FormControl variant="outlined" fullWidth >
      <InputLabel id="category-label">Filter by Category</InputLabel>
      <Select
        labelId="category-label"
        id="category-select"
        multiple
        
        value={filterCategory}
        onChange={handleCategoryChange}
        label="Filter by Category"
        renderValue={(selected) => selected.join(", ")}
      >
        {category.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Category;