import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../state";
import {Typography, Button, CircularProgress} from "@mui/material";
import Search from "../../components/Search";
import Sort from "../../components/Sort";
import Category from "../../components/Category";
import {useMediaQuery} from "@mui/material";
import { Box } from "@mui/material";
import CustomPagination from "../../components/CustomPagination";
import ProductWidget from "./ProductWidget";
import Status from "../../components/Status"

const ProductsWidget = ({ userId, isProfile = false , isBookedProducts=false }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const token = useSelector((state) => state.token);
  const Role = useSelector((state)=> state.user.role);
  const firstName = useSelector((state)=> state.user.firstName);
  const [sort, setSort] = useState(JSON.parse(localStorage.getItem("productSort")) || { sort: "quantity", order: "desc" });
  const [filterCategory, setFilterCategory] = useState(JSON.parse(localStorage.getItem("productFilterCategory")) || []);
  const [filterStatus, setFilterStatus] = useState(JSON.parse(localStorage.getItem("productFilterStatus")) || []); 
  const [filterName, setFilterName] = useState(JSON.parse(localStorage.getItem("productFilterName")) || "");
  const [page, setPage] = useState(isProfile ? 1 : parseInt(localStorage.getItem("productPage")) || 1);
  const [search, setSearch] = useState("");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [loading, setLoading] = useState(true);

 
  
  
  const clearFilters = () => {
    setFilterCategory([]); // Clear filterTheme state
    setFilterStatus([]);
    setFilterName(""); // Optionally clear location filter as well
    setPage(1); // Reset page to 1 when filters are cleared
    localStorage.removeItem("productFilterCategory"); // Remove stored filterTheme from localStorage
    localStorage.removeItem("productFilterName"); // Optionally remove stored filterLocation as well
    localStorage.removeItem("productFilterStatus"); // Remove stored filterTheme from localStorage

   
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true); // Start loading
        const filterCategoryString = filterCategory.join(",");
        const filterStatusString = filterStatus.join(",");

        const response = await fetch(
          `https://intelligent-supplychain-management.onrender.com/products?page=${page}&sort=${sort.sort},${sort.order}&category=${filterCategoryString}&status=${filterStatusString}&search=${search}&name=${filterName}`, // Include location in the API request
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
  
        const data = await response.json();
  
        dispatch(setProducts({ products: data }));
        setLoading(false); // End loading
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false); // End loading
      }
    };
  
    const getUserProducts = async () => {
      setLoading(true); // Start loading
      const filterCategoryString = filterCategory.join(",");
      const response = await fetch(
        `https://intelligent-supplychain-management.onrender.com/products/${userId}/products?page=${page}&sort=${sort.sort},${sort.order}&category=${filterCategoryString}&search=${search}&name=${filterName}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      dispatch(setProducts({ products: data }));
      setLoading(false); // End loading

    };

    const getBookedProducts = async () => {
      setLoading(true); // Start loading
      const filterCategoryString = filterCategory.join(",");

      const response = await fetch(
        `https://intelligent-supplychain-management.onrender.com/products/${userId}/bookedproducts?page=${page}&sort=${sort.sort},${sort.order}&category=${filterCategoryString}&search=${search}&name=${filterName}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      dispatch(setProducts({ products: data }));
      setLoading(false); // End loading

    };

    if (isProfile) {
      getUserProducts();
      
    } else if(isBookedProducts){
      getBookedProducts();
    }
     else {
      getProducts();
    }
  }, [sort, filterCategory, filterStatus, filterName, page, search, userId, isProfile, token]);
  

  const handleSortChange = (newSort) => {
    setSort(newSort);
    setPage(1); // Reset page to 1 when sorting changes
    localStorage.setItem("productSort", JSON.stringify(newSort));
  };

  const handleFilterCategoryChange = (newFilterCategory) => {
    setFilterCategory(newFilterCategory);
    setPage(1); // Reset page to 1 when filter changes
    localStorage.setItem("productFilterCategory", JSON.stringify(newFilterCategory));
  };

  const handleFilterStatusChange = (newFilterStatus) => {
    setFilterStatus(newFilterStatus);
    setPage(1); // Reset page to 1 when filter changes
    localStorage.setItem("productFilterStatus", JSON.stringify(newFilterStatus));
  };


  const handleFilterNameChange = (newProductName) => {
    setFilterName(newProductName);
    setPage(1); // Reset page to 1 when location filter changes
    localStorage.setItem("productFilterName", JSON.stringify(newProductName));
  };


  const handlePageChange = (newPage) => {
    setPage(newPage);
    localStorage.setItem("productPage", newPage);
   
  };

  return (
    <>
    {loading ? (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <CircularProgress />
      </Box>
  ) : (
    <Box>
     
      {/* Filters */}
      <Box mt={3}  >
        
        <Box display={"flex"} gap={ isNonMobile?  7 : 2}>
          <Box>
          <Sort sort={sort} setSort={handleSortChange} />
          </Box>
          <Box textAlign={"center"}>
            {Role == "employee" ? (
              <>
               <Typography fontSize={isNonMobile? "2rem" : "1rem"} color={"primary"} > Welcome !  </Typography>
                 <Typography fontSize={isNonMobile? "3rem" : "2rem"} color={"primary"} fontWeight={"bold"} >{firstName} </Typography>
              </>
                
            ):(
              <>
              <Typography fontSize={isNonMobile? "2rem" : "1rem"} color={"#834bff"} > Welcome !  </Typography>
              <Typography fontSize={isNonMobile? "3rem" : "2rem"} color={"#834bff"} fontWeight={"bold"} >{firstName} </Typography>
            
              </>
              
            )}
           
          </Box>
        

        </Box>
        <Box mt={2}>
      {/* First row of search inputs */}
      <Box display="flex" gap={2} mb={2}>
        <Search
          value={filterName}
          onChange={handleFilterNameChange}
          placeholder="Search by Product Name"
        />
        
      </Box>
      
    </Box>
        
        <Box mt={2}>
        <Category
          filterCategory={filterCategory}
          category={products.category ? products.category : []}
          setFilterCategory={handleFilterCategoryChange}
        />
        </Box>
        {(Role == 'employee' && !isBookedProducts) && (
          <Box mt={2}>
          <Status
            filterStatus={filterStatus}
            status={products.status ? products.status : []}
            setFilterStatus={handleFilterStatusChange}
          />
          </Box>
        )}
        
        <Box mt={2}>
        { Role==="employee" ? (
           <Button variant="outlined" onClick={clearFilters}>
           <Typography fontSize={"1rem"}>  Clear Filters</Typography>
         </Button>
        ):(
          <Button  variant="outlined"
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
          }} onClick={clearFilters}>
              <Typography fontSize={"1rem"}>  Clear Filters</Typography>
            </Button>
        )}
       

         
        </Box>
        {!isBookedProducts && (
    <Typography mt={"1rem"} fontSize={isNonMobile ? "3rem" : "1rem"} color={Role === "supplier" ? "#834bff" : "primary"}>
        {Role === "supplier" ? "Your Products" : "Products in Inventory"}
    </Typography>
)}

      </Box>
      {/* Product Listings */}
      <Box>
        {Array.isArray(products.products) &&
          products.products.map(
            ({
              _id,
              userId,
              name,
              description,
              price,
              quantity,
              minQuantity, 
              reorderPoint,
              maxQuantity,
              category,
              status,
              bookings
            }) => (
              <ProductWidget
                key={_id}
                productId={_id}
                productUserId={userId}
                name={name}
                description={description}
                price={price}
                quantity={quantity}
                minQuantity={minQuantity}
                reorderPoint={reorderPoint}
                maxQuantity={maxQuantity}
                status={status}
                category={category}
                bookings={bookings}
              />
            )
          )}
           <Box display={"flex" } justifyContent={"center"}>
      <CustomPagination
        page={page}
        limit={products.limit ? products.limit : 0}
        total={products.total ? products.total : 0}
        setPage={handlePageChange}
      />
    </Box>
        
      </Box>
       
    </Box>
    )}
    </>
  );
};

export default ProductsWidget;