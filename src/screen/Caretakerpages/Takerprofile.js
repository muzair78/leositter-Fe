import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import CaretakerLanding from "../../components/caretaker/CaretakerLanding";
import Footer from "../../components/footer/Footer";

const Takerprofile = () => {
  const user = localStorage.getItem("user");
  return (
    <>
      <Navbar user={user} />
      <CaretakerLanding />
      <Footer />
    </>
  );
};

export default Takerprofile;
