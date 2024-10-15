import { Box, Typography } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useSelector , useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import UserImage from "../../components/UserImage";
import {useMediaQuery} from "@mui/material";
import { setProduct } from "../../state";
import BookedUserWidget from "./BookedUserWidget";

const ProductDetailWidget = ({
  productId,
  productUserId,
  name,
  description,
  price,
  quantity,
  minQuantity,
  reorderPoint,
  maxQuantity,
  status,
  category,
  bookings
}) => {
  const dispatch = useDispatch();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const navigate = useNavigate();
  const token = useSelector((state)=> state.token);
  const role = useSelector((state)=> state.user.role);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isBooked = Boolean(bookings[loggedInUserId]);
  const bookingCount = Object.keys(bookings).length;
  const userIds = Object.keys(bookings);
  
  // Function to handle edit button click
  const payProduct = () => {
    // Redirect to edit form with event ID as URL parameter
    navigate(`/pay`);
  };

console.log(productId);
  const patchProduct = async () => {
    const response = await fetch(`https://intelligent-supplychain-management.onrender.com/products/${productId}/booking`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    if (response.status === 400) {
      // Backend returned a "No available seats" message
      const data = await response.json();
      alert(data.message);
      return;
    }
    const updatedProduct= await response.json();
    dispatch(setProduct({ product : updatedProduct }));
    
  };
  
  return (
    <Box padding={"1.5rem 1.5rem 0.75rem 1.5rem"} gap={"5rem"} display={ isNonMobileScreens ? "flex" : "block"} >
    
    <WidgetWrapper
  mt="2rem"
  width={isNonMobileScreens ? "60%" : "100%"}
  p="2rem"
  backgroundColor="#1a1a1a"
  borderRadius="1.5rem"
  boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
>
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    gap={isNonMobileScreens ? "2rem" : "1rem"}
    mb="1rem"
  >
    <Typography
      fontSize={isNonMobileScreens ? "3rem" : "2rem"}
      color={role === "employee" ? "primary" : "#834bff"}
      fontWeight="bold"
    >
      Product Details
    </Typography>
  </Box>

  <Box mt="1rem">
    <Box
      style={{
        borderRadius: "2rem",
        padding: "1rem",
        backgroundColor: "#2a2a2a",
        marginBottom: "1rem",
      }}
      display={"flex"} 
      alignItems={"center"}
    >
      <Typography color="white" variant="subtitle1" ml="0.3rem">
        Product Name:
      </Typography>
      <Typography
        ml="0.5rem"
        color="white"
        variant="h6"
        fontSize={isNonMobileScreens ? "1.2rem" : "1rem"}
        fontWeight="bold"
      >
        {name}
      </Typography>
    </Box>

    <Box
      style={{
        borderRadius: "2rem",
        padding: "1rem",
        backgroundColor: "#2a2a2a",
        marginBottom: "1rem",
      }}
      display={"flex"} 
      alignItems={"center"}
    >
      <Typography color="white" variant="subtitle1" ml="0.3rem">
        Description:
      </Typography>
      <Typography
        ml="0.5rem"
        color="white"
        variant="h6"
        fontSize={isNonMobileScreens ? "1.2rem" : "1rem"}
        fontWeight="bold"
      >
        {description}
      </Typography>
    </Box>

    <Box
      style={{
        borderRadius: "2rem",
        padding: "1rem",
        backgroundColor: "#2a2a2a",
        marginBottom: "1rem",
      }}
      display={"flex"} 
      alignItems={"center"}
    >
      <Typography color="white" variant="subtitle1" ml="0.3rem">
        Price:
      </Typography>
      <Typography
        ml="0.5rem"
        color="white"
        variant="h6"
        fontSize={isNonMobileScreens ? "1.2rem" : "1rem"}
        fontWeight="bold"
      >
        {price}
      </Typography>
    </Box>

    <Box
      style={{
        borderRadius: "2rem",
        padding: "1rem",
        backgroundColor: "#2a2a2a",
        marginBottom: "1rem",
      }}
      display={"flex"} 
      alignItems={"center"}
    >
      <Typography color="white" variant="subtitle1" ml="0.3rem">
        Quantity:
      </Typography>
      <Typography
        ml="0.5rem"
        color="white"
        variant="h6"
        fontSize={isNonMobileScreens ? "1.2rem" : "1rem"}
        fontWeight="bold"
      >
        {quantity}
      </Typography>
    </Box>

    {minQuantity != null && (
      <>
        <Box
          style={{
            borderRadius: "2rem",
            padding: "1rem",
            backgroundColor: "#2a2a2a",
            marginBottom: "1rem",
          }}
          display={"flex"} 
      alignItems={"center"}
        >
          <Typography color="white" variant="subtitle1" ml="0.3rem">
            Minimum Quantity:
          </Typography>
          <Typography
            ml="0.5rem"
            color="white"
            variant="h6"
            fontSize={isNonMobileScreens ? "1.2rem" : "1rem"}
            fontWeight="bold"
          >
            {minQuantity}
          </Typography>
        </Box>

        <Box
          style={{
            borderRadius: "2rem",
            padding: "1rem",
            backgroundColor: "#2a2a2a",
            marginBottom: "1rem",
          }}
          display={"flex"} 
      alignItems={"center"}
        >
          <Typography color="white" variant="subtitle1" ml="0.3rem">
            Reorder Point:
          </Typography>
          <Typography
            ml="0.5rem"
            color="white"
            variant="h6"
            fontSize={isNonMobileScreens ? "1.2rem" : "1rem"}
            fontWeight="bold"
          >
            {reorderPoint}
          </Typography>
        </Box>

        <Box
          style={{
            borderRadius: "2rem",
            padding: "1rem",
            backgroundColor: "#2a2a2a",
            marginBottom: "1rem",
          }}
          display={"flex"} 
      alignItems={"center"}
        >
          <Typography color="white" variant="subtitle1" ml="0.3rem">
            Maximum Quantity:
          </Typography>
          <Typography
            ml="0.5rem"
            color="white"
            variant="h6"
            fontSize={isNonMobileScreens ? "1.2rem" : "1rem"}
            fontWeight="bold"
          >
            {maxQuantity}
          </Typography>
        </Box>
      </>
    )}

    <Box
      style={{
        borderRadius: "2rem",
        padding: "1rem",
        backgroundColor: "#2a2a2a",
        marginBottom: "1rem",
      }}
      display={"flex"} 
      alignItems={"center"}
    >
      <Typography color="white" variant="subtitle1" ml="0.3rem">
        Category:
      </Typography>
      <Typography
        ml="0.5rem"
        color="white"
        variant="h6"
        fontSize={isNonMobileScreens ? "1.2rem" : "1rem"}
        fontWeight="bold"
      >
        {category}
      </Typography>
    </Box>
  </Box>

  {role === "employee" && status === "Marketplace" && (
    <FlexBetween gap="0.3rem" mt="2rem">
      <Button
        onClick={patchProduct}
        variant={isBooked ? "contained" : "outlined"}
        color={isBooked ? "error" : "primary"}
        sx={{
          fontWeight: "bold",
          padding: "0.8rem 2rem",
          borderRadius: "1.5rem",
        }}
      >
        {isBooked ? "Cancel Product" : "Order Product"}
      </Button>
      <Button
        onClick={payProduct}
        variant="contained"
        color="success"
        sx={{
          fontWeight: "bold",
          padding: "0.8rem 2rem",
          borderRadius: "1.5rem",
        }}
      >
        Pay
      </Button>
    </FlexBetween>
  )}

  {role === "supplier" && status === "Marketplace" && (
    <Box
      style={{
        borderRadius: "2rem",
        padding: "1rem",
        backgroundColor: "#2a2a2a",
        marginTop: "1.5rem",
      }}
    >
      <Typography color="white" variant="subtitle1" ml="0.3rem">
        Orders for this Product:
      </Typography>
      <Typography
        ml="0.5rem"
        color="white"
        variant="h6"
        fontSize={isNonMobileScreens ? "1.2rem" : "1rem"}
        fontWeight="bold"
      >
        {bookingCount}
      </Typography>
    </Box>
  )}
</WidgetWrapper>

         
        <Box>
        {role === "supplier" && (
            <>
            <Typography mt={"1rem"} fontSize={isNonMobileScreens? "2rem" : "1.5rem"} color={"#834bff"} > Ordered this Product : </Typography>
            {userIds.map((userId) => (
              <Box key={userId} mt={"1rem"}>
               <BookedUserWidget key={userId} userId={userId}  ></BookedUserWidget>
              </Box> 
            ))}
            </>
          )}
        </Box>
         
    </Box>
        
              
  )
}

export default ProductDetailWidget