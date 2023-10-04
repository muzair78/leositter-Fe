import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Caregiverprofile from "../../components/caregiver/Caregiverprofile";

const Giverprofile = () => {
  const user = localStorage.getItem("user");
  return (
    <>
      <Navbar user={user} />
      <Caregiverprofile />
    </>
  );
};

export default Giverprofile;
