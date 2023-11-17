import React from "react";
import Router from "./routes/index";

import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <Router />
      <ToastContainer />
    </>
  );
};

export default App;
