import React from "react";
import { Select, MenuItem,  InputLabel } from "@mui/material";
import { FormControl } from '@mui/material';


const Sort = ({ sort, setSort }) => {
    const handleSortChange = (event) => {
      const { name, value } = event.target;
      setSort({ ...sort, [name]: value });
    };
  
    return (
      <FormControl variant="outlined">
        <InputLabel id="sort-label">Sort By</InputLabel>
        <Select
          labelId="sort-label"
          id="sort-select"
          value={sort.sort}
          onChange={handleSortChange}
          label="Sort By"
          name="sort"
        >
          <MenuItem value="quantity"> Quantity</MenuItem>
         
          {/* Add other sorting options as MenuItem components */}
        </Select>
        <Select
          labelId="order-label"
          id="order-select"
          value={sort.order}
          onChange={handleSortChange}
          label="Order"
          name="order"
        >
          <MenuItem value="asc"> less to more</MenuItem>
          <MenuItem value="desc">more to less</MenuItem>
        </Select>
      </FormControl>
    );
  };
  
  export default Sort;