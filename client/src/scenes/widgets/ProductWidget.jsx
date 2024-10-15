
  import { useNavigate } from "react-router-dom";
  import { Box,  Typography } from "@mui/material";
  import WidgetWrapper from "../../components/WidgetWrapper";
  import {useMediaQuery} from "@mui/material";
  import { useDispatch, useSelector } from "react-redux";
  import { setProduct} from "../../state";
  import Button from '@mui/material/Button'; // Updated import
  
  const ProductWidget =({
    productId,
    productUserId,
    name,
    description,
    price,
    quantity,
    minQuantity,
    reorderPoint,
    maxQuantity,
    supplierId,
    status,
    category,  
    bookings         
  })=>{
      
      const dispatch = useDispatch();
      const token = useSelector((state) => state.token);
      const loggedInUserId = useSelector((state) => state.user._id);
      const navigate = useNavigate();
      const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
      const {role} = useSelector((state)=> state.user);
      const bookingCount = Object.keys(bookings).length;

      
  
      const deleteProduct = async () => {
          const response = await fetch(`https://intelligent-supplychain-management.onrender.com/products/${productUserId}/${productId}/delete`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          const result = await response.json();
          dispatch(setProduct({ product: result }));
          navigate("/delete");
  
         
      };
  
      
  
      
      return(
          <WidgetWrapper m="2rem 0" >
              <Box display="flex" flexDirection="row" alignItems="center">
                  <Box display={"block"} justifyContent="space-between" alignItems="center" width="100%" mt={"1rem"} gap={  1 }>
                 
                
               
                  <Box display={"block"}  >
  
                  <Box style={{
                      borderRadius: "2rem",
                      padding: "0.5rem 1rem",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                  }} >
                      
                      <Typography color="white" variant="subtitle1" ml={"0.3rem"}  >
                          Category : 
                         
                          <Typography color={"white"} variant="h6" fontSize={isNonMobileScreens? "1.5rem" : "1.2rem"} textAlign={"center"} fontWeight={"bold"}>
                        {category}
                    </Typography>
                      </Typography>
                  </Box>
                  <Box style={{
                      borderRadius: "2rem",
                      padding: "0.5rem 1rem",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                  }} >
                      <Typography color="white" variant="subtitle1" ml={"0.3rem"}  >
                       Name : 
                        <Typography color={"white"} variant="h6" fontSize={isNonMobileScreens? "1.5rem" : "1.2rem"} textAlign={"center"} fontWeight={"bold"}>
                        {name}
                    </Typography>
                      </Typography>
                  </Box>
                  </Box>
                  <Box style={{
                      borderRadius: "2rem",
                      padding: "0.5rem 1rem",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                  }} >
                      <Typography color="white" variant="subtitle1" ml={"0.3rem"}  >
                        Price
                        <Typography ml={"0.5rem"} color={"white"} variant="h7" fontSize={isNonMobileScreens? "1.2rem" : "1.2rem"} textAlign={"center"} fontWeight={"bold"}>
                         {price}
                    </Typography>
                      </Typography>
                  </Box>
                  
                      <Box
                      
                       style={{
                      borderRadius: "2rem",
                      padding: "0.5rem 1rem",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                  }} >
                      
                      <Typography color="white" variant="subtitle1" ml={"0.3rem"}  >
                        Quantity : 
                      </Typography>
                      <Typography ml={"0.5rem"} color={"white"} variant="h9" fontSize={isNonMobileScreens? "1.2rem" : "1.2rem"} textAlign={"center"} fontWeight={"bold"}>
                        {quantity}
                    </Typography>
                      
                      
                  </Box>

                    {role == 'employee' && (
                    <Box
                                        
                    style={{
                    borderRadius: "2rem",
                    padding: "0.5rem 1rem",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    }} >
                    
                    <Typography color="white" variant="subtitle1" ml={"0.3rem"}  >
                    Status : 
                    </Typography>
                    <Typography ml={"0.5rem"} color={"white"} variant="h9" fontSize={isNonMobileScreens? "1.2rem" : "1.2rem"} textAlign={"center"} fontWeight={"bold"}>
                    {status}
                    </Typography>
                    
                    
                    </Box>
                    )}
                

                  { reorderPoint != null && (
                     <Box style={{
                        borderRadius: "2rem",
                        padding: "0.5rem 1rem",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                    }} >
                        <Box display={isNonMobileScreens? "flex" : "block"}>
                        <Typography color="white" variant="subtitle1" ml={"0.3rem"}  >
                          Reorder Point : 
                        </Typography>
                        <Typography ml={"0.5rem"} color={"white"} variant="h9" fontSize={isNonMobileScreens? "1.2rem" : "1rem"} textAlign={"center"} fontWeight={"bold"}>
                          {reorderPoint}
                      </Typography>
                        </Box>
                        
                    </Box>
                   
               
                  )}
                   </Box>
                  </Box>
              <Box display="flex" justifyContent="space-between" mt="1rem" gap={2}>
                  
                
              {(role === "supplier" && bookingCount > 0) && (
                    
                    <Box sx={{
                        borderRadius: "2rem",
                        bgcolor: "#834bff",
                        padding: "0.5rem 1rem",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        border:"0.1rem solid  #1E1E1E",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                    }}>
                        <Typography color="white" variant="subtitle1">
                        {bookingCount}  Bookings
                        </Typography>
                    </Box>
                    )}
                  { (loggedInUserId == productUserId )&& (
                      <>
                      <Button 
                      size="small"
                          variant="contained" 
                          success
                         color="error"
                          onClick={deleteProduct}
                      > Delete Product 
                      </Button>                     
                      </>   
                  )}
                  
              </Box>
              <Box mt={3} >
                  {role === "supplier" ? (
                      <Button 
                      variant="contained" 
                      style={{
                          borderRadius: 6,
                          padding: "0.5rem 1rem",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          size:"small",
                          backgroundColor: "#834bff", // Change background color here
                          
                      }} 
                      onClick={() => navigate(`/products/${productId}/product`)}
        
                  >
                      <Typography color="white" fontSize={isNonMobileScreens ? "1rem" : "0.8rem"} >
                          Details
                      </Typography>
                  </Button>
                  ):(
                      <Button 
                  
                      variant="contained" 
                      style={{
                          borderRadius: 6,
                          padding: "0.5rem 1rem",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          size:"small",
                      }} 
                      onClick={() => navigate(`/products/${productId}/product`)}
                  >
                      <Typography color="white" fontSize={isNonMobileScreens ? "1rem" : "0.8rem"} >
                          Details
                      </Typography>
                  </Button>
              
                  )}
              
             
              </Box>
              
          </WidgetWrapper>  
      );
  }
  export default ProductWidget;