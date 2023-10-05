import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Caregiverprofile from "../../components/caregiver/Caregiverprofile";
import Footer from "../../components/footer/Footer";

const Giverprofile = () => {
  const user = localStorage.getItem("user");
  return (
    <>
      <Navbar user={user} />
      <Caregiverprofile />
      <Footer />
    </>
  );
};

export default Giverprofile;
