import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Home1 from "../components/Home/Home1";
import Home2 from "../components/Home/Home2";
import Home3 from "../components/Home/Home3";
import Home4 from "../components/Home/Home4";
import Footer from "../components/footer/Footer";

const LandingPage = () => {
  const user = localStorage.getItem("user");

  return (
    <>
      <Navbar />
      <Home4 />
      <Footer />
    </>
  );
};

export default LandingPage;
