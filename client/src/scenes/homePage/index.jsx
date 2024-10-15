import React from 'react'
import Navbar from '../navbar'
import { Box , useMediaQuery,useTheme} from '@mui/material'
import { useSelector } from 'react-redux'
import UserWidget from '../widgets/UserWidget'
import { Link } from 'react-router-dom'
import {Button} from '@mui/material'
import ProductsWidget from '../widgets/ProductsWidget'


const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
  const {_id, picturePath, role} = useSelector((state)=> state.user);
  
  return (
    <Box>
      <Navbar></Navbar>
      <Box
      width={"100%"}
      padding={"2rem 6%"}
      display={isNonMobileScreens ? "flex": "block"}
      gap={"5rem"}

      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
            <UserWidget userId={_id} picturePath={picturePath}>
            </UserWidget>
        </Box>
        {role=='supplier' && (
            <Box 
            flexBasis={isNonMobileScreens ? "42%" : undefined}
            mt={isNonMobileScreens ? undefined : "2rem"}
            >
          <Link to="/myproduct" >
        <Button 
         variant="outlined"
         size="large"
         sx={{ 
           fontSize: '1.25rem', // Change font size here
           padding: '12px 24px',
           color:"#834bff",
           borderColor:"#834bff"  ,
           '&:hover': {
             color: '#fff', // Change text color on hover
             backgroundColor: '#834bff', // Change background color on hover
             borderColor: '#834bff', // Change border color on hover
           },       
         }}
         // Adjust size here
        >
          Add your Product
        </Button>
      </Link>
              <ProductsWidget userId={_id} isProfile={true}></ProductsWidget>
            </Box>  
          )}
          {role=='employee' && (
            <Box 
            flexBasis={isNonMobileScreens ? "42%" : undefined}
            mt={isNonMobileScreens ? undefined : "2rem"}
            >
              <Box  display='flex' gap={5}>
              <Link to="/myproduct" >
        <Button 
         variant="outlined"
         size="large"
         color='primary'
         // Adjust size here
        >
          Add Product 
        </Button>
      </Link>
      <Link to="/prediction" >
        <Button 
         variant="contained"
         size="large"
         color='primary'
         // Adjust size here
        >
          Sales Prediction
        </Button>
      </Link>
              </Box>
              
            <ProductsWidget userId={_id} ></ProductsWidget>
            </Box>
          )}
      </Box>
    </Box>
    
  )
}

export default HomePage