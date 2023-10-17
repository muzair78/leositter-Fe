import React from "react";
import { Col, Row, Button } from "antd";
import { NavLink } from "react-router-dom";
import "./FindJob.css";

const FindJob = () => {
  return (
    <>
      <div className="cards">
        {" "}
        <Row>
          <div className="care-giver">
            <Col sm={24} xs={24}>
              <div className="care-content">
                <h3 style={{ fontSize: "1.5rem" }}>I need a caregiver</h3>
                <p>Start your free search for care in your area.</p>
                <NavLink to={"/caretaker-signup"}>
                  {" "}
                  <Button type="primary" danger>
                    Get Started
                  </Button>
                </NavLink>
              </div>
            </Col>
          </div>{" "}
          <div className="job-seeker">
            <Col sm={24} xs={24}>
              <div className="job-content">
                <h3 style={{ fontSize: "1.5rem" }}>I want a care job</h3>
                <p>Create a profile and search for jobs.</p>
                <NavLink to={"/caregiver-signup"}>
                  <Button danger type="primary">
                    Get Started
                  </Button>
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
