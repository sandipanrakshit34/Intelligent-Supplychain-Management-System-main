import React from 'react'
import { Box } from '@mui/material'
import Navbar from '../navbar'
import {Typography} from '@mui/material'
const DeletePage = () => {
  return (
    <Box>
    <Navbar></Navbar>
    <Box
  width={"100%"}
  padding={"2rem 6%"}
  gap="1rem"
  justifyContent={"center"} // Aligning children horizontally at center
  alignItems={"center"}     // Aligning children vertically at center
  bgcolor={"#080808"}
>
  <Box display={"flex"} flexDirection="column" gap={1} textAlign={"center"}>
    <Typography color={"primary"} fontSize={"6rem"}>
      Product
    </Typography>
    <Typography fontSize={"5rem"}>Deleted</Typography>
    <Typography color={"primary"} fontSize={"5rem"}>
      Successfully
    </Typography>
  </Box>
  <Box display={"flex"} justifyContent="center">
    <Typography fontSize={"3rem"}>Go to Home</Typography>
  </Box>
</Box>

    </Box>
  )
}

export default DeletePage