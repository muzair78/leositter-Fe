import React from "react";

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
