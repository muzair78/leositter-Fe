import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/footer/Footer";
import SitterNearMe from "../../components/SitterNearMe/SitterNearMe";

const Nearme = () => {
  const user = localStorage.getItem("user");
  return (
    <>
      <Navbar user={user} />
      <SitterNearMe />
      <Footer />
    </>
  );
};

export default Nearme;
