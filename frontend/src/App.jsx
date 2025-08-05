import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import { ThemeProvider } from "./components/context/ThemeContext";
import nprogress from "nprogress";
import { Provider } from "react-redux";
import store from "./store/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";

nprogress.configure({ showSpinner: false });

const Home = lazy(() => import("./pages/Home"));
const Category = lazy(() => import("./pages/NavbarCategory"));
const Content = lazy(() => import("./pages/Content"));

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const App = () => {
  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/checktoken`,
          { withCredentials: true }
        );
        if (res.status === 200) {
          console.log("Token is valid");
        }
      } catch (error) {
        // If token is invalid or expired, clear localStorage
        if (error.response && error.response.status === 401) {
          console.warn("Token expired. Logging out...");
          localStorage.removeItem("user");
        }
      }
    };

    checkToken(); // ✅ Call the function
  }, []);

  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <BrowserRouter>
          <ThemeProvider>
            <Header />
            <Suspense
              fallback={
                <div className="min-h-screen text-center py-10 text-gray-700 dark:text-gray-300">
                  Loading...
                </div>
              }
            >
              <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/category/:topic" element={<Category />} />
                  <Route path="/content/:id" element={<Content />} />
                </Routes>
              </div>
            </Suspense>
            <Footer />
          </ThemeProvider>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </Provider>
  );
};

export default App;
