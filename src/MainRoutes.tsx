import React from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import Chat from "./components/Chat/Chat/Chat";
import EditProduct from "./components/CRUD/EditProduct/EditProduct";
import ProductDetails from "./components/CRUD/ProductDetails/ProductDetails";
import Set from "./components/CRUD/Set/Set";
import RealTime from "./components/RealTime/RealTime";
import { useAuth } from "./contexts/AuthContext";
import { ADMIN } from "./helpers/consts";
import AdminPage from "./pages/AdminPage";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import ProductListPage from "./pages/ProductListPage";

const MainRoutes = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const ROUTES = [
    {
      link: "/",
      element: <HomePage />,
      id: 1,
    },
    {
      link: "/auth",
      element: <AuthPage />,
      id: 2,
    },

    {
      link: "/chat",
      element: <Chat />,
      id: 3,
    },
    {
      link: "/realtime",
      element: <RealTime />,
      id: 4,
    },
    {
      link: "/list",
      element: <ProductListPage />,
      id: 5,
    },
    {
      link: "/edit/:id",
      element: <EditProduct />,
      id: 6,
    },
    {
      link: "/list/:id",
      element: <ProductDetails />,
      id: 7,
    },
    {
      link: "/cart",
      element: <Cart />,
      id: 8,
    },

    {
      link: "/set",
      element: <Set />,
      id: 9,
    },
  ];

  const PRIVATE_ROUTES = [
    {
      link: "/admin",
      element: <AdminPage />,
      id: 1,
    },
  ];

  return (
    <div>
      <Routes>
        {ROUTES.map((item) => (
          <Route path={item.link} element={item.element} />
        ))}

        {user
          ? PRIVATE_ROUTES.map((item) => (
              <Route
                path={item.link}
                element={
                  user.email === ADMIN ? (
                    item.element
                  ) : (
                    <Navigate replace to="*" />
                  )
                }
              />
            ))
          : null}
      </Routes>
    </div>
  );
};

export default MainRoutes;
