import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import { RoutesWrapper } from "./components/RoutesWrapper"
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {

  return (
    <AuthProvider>
      <BrowserRouter>
        <RoutesWrapper />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
