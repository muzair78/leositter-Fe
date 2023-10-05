import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Caretakerdata from "../../components/caretaker/Caretakerdata";
import Footer from "../../components/footer/Footer";

const Takerdata = () => {
  const user = localStorage.getItem("user");
  return (
    <>
      <Navbar user={user} />
      <Caretakerdata />
      <Footer />
    </>
  );
};

export default Takerdata;
