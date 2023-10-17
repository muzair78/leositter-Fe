import React from "react";
import { Col, Row } from "antd";
import { NavLink } from "react-router-dom";
import "./FindJob.css";

const FindJob = () => {
  return (
    <>
      <div className="cards">
        {" "}
        <Row>
          <div className="care-giver">
            <Col>
              <div className="care-content">
                <h3 style={{ fontSize: "1.5rem" }}>I need a caregiver</h3>
                <p>Start your free search for care in your area.</p>
                <NavLink to={"/caretaker-signup"}>
                  {" "}
                  <button className="care-btn">Get Started</button>
                </NavLink>
              </div>
            </Col>
          </div>{" "}
          <div className="job-seeker">
            <Col>
              <div className="job-content">
                <h3 style={{ fontSize: "1.5rem" }}>I want a care job</h3>
                <p>Create a profile and search for jobs.</p>
                <NavLink to={"/caregiver-signup"}>
                  <button className="care-btn">Get Started</button>
                </NavLink>
              </div>
            </Col>
          </div>
        </Row>
      </div>
    </>
  );
};

export default FindJob;
