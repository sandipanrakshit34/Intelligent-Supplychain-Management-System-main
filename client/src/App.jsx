import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React, { useMemo, lazy, Suspense } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import LoginPage from "./scenes/loginPage";
import HomePage from "./scenes/homePage";
import ProfilePage from "./scenes/profilePage";
import MyProductPage from "./scenes/myProductPage";
import ProductDetail from "./scenes/productDetailPage";
import EmployeeProfilePage from "./scenes/employeeprofilePage";
import PaymentPage from "./scenes/paymentPage";
import PredictionPage from "./scenes/predictionsPage";
import DeletePage from "./scenes/deletePage";
function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <div className="App">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <Routes>
          <Route path="/" element={<LoginPage></LoginPage>}></Route>

          <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
          <Route
            path="/employee/:userId"
            element={isAuth ? <EmployeeProfilePage></EmployeeProfilePage> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/myproduct"
            element={isAuth ? <MyProductPage></MyProductPage> : <Navigate to="/" />}
          ></Route>
           <Route
            path="/products/:productId/product"
            element={isAuth ? <ProductDetail></ProductDetail> : <Navigate to="/" />}
          ></Route>

        <Route
            path="/pay"
            element={isAuth ? <PaymentPage></PaymentPage> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/prediction"
            element={isAuth ? <PredictionPage></PredictionPage> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/delete"
            element={isAuth ? <DeletePage></DeletePage> : <Navigate to="/" />}
          ></Route>

        </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;