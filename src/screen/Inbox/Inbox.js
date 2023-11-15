import Navbar from "../../components/Navbar/Navbar";
import Message from "../../components/Message/Message";
import Footer from "../../components/footer/Footer";

import React from "react";

const Inbox = () => {
  const user = localStorage.getItem("user");
  return (
    <>
      <Navbar user={user} />
      <Message />
      <Footer />
    </>
  );
};

export default Inbox;
