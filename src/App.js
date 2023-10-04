import React from "react";
// import WebRoute from "./components/routes/webRoutes";
// import { BrowserRouter } from "react-router-dom";
import WebRoutes from "./routes/webRoutes";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <ToastContainer />
      <WebRoutes />
    </>
  );
};

export default App;
