import React, { useEffect, useState } from "react";
import axios from "axios";
import "./siter.css";
import { Col, Form, Rate, Row } from "antd";
import imge1 from "../../assets/circle.jpg";
import { StarFilled } from "@ant-design/icons";
import { ImAidKit } from "react-icons/im";
import { FaHandHoldingHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import instance from "../../helpers/BaseUrl";

const SitterNearMe = () => {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState();
  const { type } = useParams();

  const fetchData = async () => {
    try {
      const response = await instance.get(`user/sitters/${type}`);
      const array = response.data.findSitter;
      setProfile();
      if (array.length > 0) {
        setUser(array);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const CustomStar = () => <StarFilled style={{ color: "#ff7875" }} />;

  useEffect(() => {
    if (type) {
      fetchData(type);
    }
  }, [type]);

  return (
    <>
      {user.map((currentUser, index) => {
        const {
          name,
          phone,
          email,
          weeklyhours,
          hourrate,
          available,
          service,
          profileImg,
        } = currentUser;
        const image = profileImg ? profileImg : imge1;
        return (
          <>
            <div className="main-card" key={index}>
              <Row justify={"center"}>
                <Col lg={3} md={4} xs={0}>
                  <div className="leftDiv">
                    <img className="imgee" src={image} />
                  </div>
                </Col>
                <Col lg={12} md={12} xs={20}>
                  <div className="rightDiv">
                    <div
                      className="info-sec"
                      style={{ fontSize: "1.4rem", fontWeight: "bold" }}
                    >
                      <div>
                        {name}
                        <span style={{ fontSize: "0.8rem" }}>({service})</span>
                      </div>
                      <div>{hourrate}$/hr</div>
                    </div>
                    <div
                      className="info-sec"
                      style={{ fontSize: "1.1rem", display: "inline-flex" }}
                    >
                      <div>10 years paid experience .15miles</div>
                      <div>
                        <Form.Item
                          name="rate"
                          label={
                            <span style={{ fontSize: "1.1rem" }}>Rate</span>
                          }
                        >
                          <Rate character={<CustomStar />} />
                        </Form.Item>
                      </div>
                    </div>
                    <div
                      className="info-sec"
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "50px",
                        marginTop: "-1.2rem",
                      }}
                    >
                      <div>{weeklyhours}/hr</div>
                      <div style={{ fontSize: "14px", marginTop: "0.4rem" }}>
                        Availibility || {available}
                      </div>
                    </div>
                    <div className="info-sec" style={{ marginTop: "1rem" }}>
                      Hello my name is tavernesia williams. Everyone calls me
                      Neshia. I am 26 years old. I graduated from tougaloo
                      college, major sociology/social work. I have been caring
                      and working with children starting newborns to teens since
                      an early age. I am currently looking for different things
                      to do while working on masters degree.
                    </div>
                    <div
                      className="info-sec"
                      style={{
                        gap: "1rem",
                        fontSize: "2.5rem",
                        marginTop: "1rem",
                        justifyContent: "start",
                      }}
                    >
                      <ImAidKit style={{ color: "#FF0000" }} />
                      <FaHandHoldingHeart style={{ color: "#DE3163" }} />
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </>
        );
      })}
    </>
  );
};

export default SitterNearMe;
