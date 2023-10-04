import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Caretakerdata from "../../components/caretaker/Caretakerdata";

const Takerdata = () => {
  const user = localStorage.getItem("user");
  return (
    <>
      <Navbar user={user} />
      <Caretakerdata />
    </>
  );
};

export default Takerdata;
