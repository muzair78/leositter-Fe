import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import CaretakerLanding from "../../components/caretaker/CaretakerLanding";

const Takerprofile = () => {
  const user = localStorage.getItem("user");
  return (
    <>
      <Navbar user={user} />
      <CaretakerLanding />
    </>
  );
};

export default Takerprofile;
