import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AuthContextProvider from "./contexts/AuthContext";
import ProductContextProvider from "./contexts/ProductContext";
import MainRoutes from "./MainRoutes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthContextProvider>
          <ProductContextProvider>
            <MainRoutes />
          </ProductContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
