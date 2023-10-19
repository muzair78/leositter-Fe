import React from "react";
import { Col, Row, Button } from "antd";
import { NavLink } from "react-router-dom";
import "./FindJob.css";
import { Card } from "antd";

const FindJob = () => {
  return (
    <>
      <div className="container-full">
        {" "}
        <Row justify={"space-between"}>
          <Col lg={11} md={11} sm={10} xs={24}>
            <Card title="I need a caregiver" bordered={false}>
              <p> Start your free search for care in your area.</p>
              <NavLink to={"/caretaker-signup"}>
                {" "}
                <Button danger type="primary">
                  Get Started
                </Button>
              </NavLink>
            </Card>
          </Col>
          <Col lg={11} md={11} sm={10} xs={24}>
            <Card title="I want a care job" bordered={false} id="s-card">
              <p>Create a profile and search for jobs.</p>
              <NavLink to={"/caregiver-signup"}>
                <Button danger type="primary">
                  Get Started
                </Button>
              </NavLink>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default FindJob;
