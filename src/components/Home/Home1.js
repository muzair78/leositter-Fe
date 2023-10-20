import { Col, Row } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";

const Home1 = () => {
  return (
    <div className="main-div">
      <div
        className="heading"
        style={{ fontSize: "4rem", textAlign: "center" }}
      >
        Find your{" "}
        <span className="friend-div" style={{ color: "#ff7775af" }}>
          best friend's
        </span>{" "}
        next best friend
      </div>
      <div
        className="mid-para"
        style={{ marginTop: "2rem", fontSize: "1.3rem" }}
      >
        Over 1,000,000 people use LeoSitter to keep their pets happy and well on
        their days in the office or trips away
      </div>
      <NavLink
        style={{ color: "black", fontSize: "1.2rem", marginTop: "2rem" }}
        to={"/caretaker-signup"}
      >
        Are you caregiver and looking for job?
      </NavLink>
      <NavLink to={"/caregiver-signup"}>
        {" "}
        <button className="body-btn-info">Find a caregiver now</button>
      </NavLink>
    </div>
  );
};

export default Home1;
