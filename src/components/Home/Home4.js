import React from "react";
import { GiHummingbird } from "react-icons/gi";
import { FaDog } from "react-icons/fa";
import { FaCat } from "react-icons/fa";
import { MdPets } from "react-icons/md";
import { GiJumpingDog } from "react-icons/gi";
import { TbDog } from "react-icons/tb";
import { GiDogBowl } from "react-icons/gi";
import { Col, Row } from "antd";

const Home4 = () => {
  return (
    <>
      {" "}
      <hr
        className="hr-line"
        style={{
          width: "5rem",
          fontWeight: "bold",
          marginTop: "3rem",
          color: "green",
        }}
      />
      <h2 className="main-heading">Our Services</h2>
      <div className="services-cards">
        <Row justify={"space-between"}>
          {" "}
          <Col lg={3} md={8} sm={24} xs={24}>
            {" "}
            <div className="card">
              <div className="circle">
                <FaDog className="font-image" />
              </div>
              <div
                style={{
                  textAlign: "center",
                  gap: "0px",
                }}
              >
                <h4>Dog Sitting</h4>
                <p style={{ fontSize: "0.8rem" }}>
                  Over 1 million people use PetSitter.com to keep their pets
                  happy and well on their days in the office or trips away
                </p>
              </div>
            </div>
          </Col>
          <Col lg={3} md={8} sm={24} xs={24}>
            {" "}
            <div className="card">
              <div className="circle">
                <FaCat className="font-image" />
              </div>
              <div
                style={{
                  textAlign: "center",
                  gap: "0px",
                }}
              >
                <h4>Cat Sitting</h4>
                <p style={{ fontSize: "0.8rem" }}>
                  Over 1 million people use PetSitter.com to keep their pets
                  happy and well on their days in the office or trips away
                </p>
              </div>
            </div>
          </Col>
          <Col lg={3} md={8} sm={24} xs={24}>
            {" "}
            <div className="card">
              <div className="circle">
                <MdPets className="font-image" />
              </div>
              <div
                style={{
                  textAlign: "center",
                  gap: "0px",
                }}
              >
                <h4>Pet Sitting</h4>
                <p style={{ fontSize: "0.8rem" }}>
                  Over 1 million people use PetSitter.com to keep their pets
                  happy and well on their days in the office or trips away
                </p>
              </div>
            </div>
          </Col>
          <Col lg={3} md={8} sm={24} xs={24}>
            {" "}
            <div className="card">
              <div className="circle">
                <GiHummingbird className="font-image" />
              </div>
              <div
                style={{
                  textAlign: "center",
                  gap: "0px",
                }}
              >
                <h4>Bird Sitting</h4>
                <p style={{ fontSize: "0.8rem" }}>
                  Over 1 million people use PetSitter.com to keep their pets
                  happy and well on their days in the office or trips away
                </p>
              </div>
            </div>{" "}
          </Col>
          <Col lg={3} md={8} sm={24} xs={24}>
            {" "}
            <div className="card">
              <div className="circle">
                <TbDog className="font-image" />
              </div>
              <div
                style={{
                  textAlign: "center",
                  gap: "0px",
                }}
              >
                <h4>Dog Grooming</h4>
                <p style={{ fontSize: "0.8rem" }}>
                  Over 1 million people use PetSitter.com to keep their pets
                  happy and well on their days in the office or trips away
                </p>
              </div>
            </div>{" "}
          </Col>
          <Col lg={3} md={8} sm={24} xs={24}>
            {" "}
            <div className="card">
              <div className="circle">
                <GiDogBowl className="font-image" />
              </div>
              <div
                style={{
                  textAlign: "center",
                  gap: "0px",
                }}
              >
                <h4>Dog Eating</h4>
                <p style={{ fontSize: "0.8rem" }}>
                  Over 1 million people use PetSitter.com to keep their pets
                  happy and well on their days in the office or trips away
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Home4;
