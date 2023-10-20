import React from "react";
import DPS from "../../assets/D-PS--1.webp";
import { Col, Row } from "antd";

const Home3 = () => {
  return (
    <>
      <Row>
        {" "}
        <hr
          style={{
            width: "5rem",
            fontWeight: "bold",
            marginTop: "8rem",
            color: "green",
          }}
        />
        <div className="next-div">
          <h3 className="header-div3">
            The #1 way to hire a professional pet sitter
          </h3>
          <div className="page-3-main">
            <Col md={24} lg={12} sm={24}>
              <div className="leftDiv">
                <h3>Trustworthy, local pet sitters</h3>
                <p>
                  Your pet is part of your family, and that's how they're
                  treated. Trustworthy, local pet sitters are the only kind
                  you'll find on our platform.
                </p>
                <hr />
                <h3>Finding the right pet sitter made easy</h3>
                <p>
                  With different filtering options and our powerful search tool,
                  we show you the most relevant pet sitters. Whether it's a
                  furry, feathered, or scaley friend, we have the pet sitter for
                  you.
                </p>
                <hr />
                <h3>A pet sitter for every occasion</h3>
                <p>
                  From a quick walk around the park to a month-long vacation,
                  you can find a pet sitter with the right availability all year
                  round.
                </p>
              </div>
            </Col>
            <Col lg={12}>
              <div className="right-image">
                <img
                  src={DPS}
                  className="dps-image"
                  alt="newpic"
                  style={{
                    height: "auto",
                    width: "100%",
                  }}
                />
              </div>
            </Col>
          </div>
        </div>
      </Row>
    </>
  );
};

export default Home3;
