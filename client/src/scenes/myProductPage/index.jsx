import React from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../navbar'
import { Box , useMediaQuery} from '@mui/material'
import MyProductWidget from '../widgets/MyProduct'

const MyProductPage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
    const { picturePath} = useSelector((state)=> state.user);

  return (
    <Box>
        <Navbar></Navbar>
        <Box  
      width={"100%"}
      padding={"2rem 6%"}
      display={isNonMobileScreens ? "flex": "block"}
      gap="1rem"
      justifyContent={"space-between"}
      
      >
        <MyProductWidget picturePath={picturePath}></MyProductWidget>
      </Box>
    </Box>
  )
}

export default MyProductPage