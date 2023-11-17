import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate, useParams, useLocation } from "react-router-dom";
import profilepic from "../../assets/Naseem-Shah.webp";
import { MdOutlineGppGood } from "react-icons/md";
import { FcLike } from "react-icons/fc";
import { FaUserGraduate } from "react-icons/fa";
import { AiTwotoneMessage } from "react-icons/ai";
import { Col, Row, Button } from "antd";

const Caretakerdata = () => {
  const [likeBtn, setlikeBtn] = useState();
  const [state, setState] = useState([]);
  const [name, setName] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  // const { _id } = useParams();
  const user = localStorage.getItem("user");
  const JSONData = JSON.parse(user);
  const service = JSONData.service;
  const { _id } = useParams();

  const fetchData = () => {
    const URL = `http://13.235.24.24:4000/petSitter/${_id}`;
    axios.get(URL).then((res) => {
      setlikeBtn(res.data.findUser);
      setName(res.data.findUser.name);
      console.log(res);
    });
  };
  const fetchRecommendedUsers = () => {
    const recommendedURL = `http://13.235.24.24:4000/caretaker/caretakerdata/people/${service}`;
    axios.get(recommendedURL).then((res) => {
      setState(res.data.findSitter);
    });
  };
  const handleCardClick = (userId) => {
    navigate(`/caretaker/caretakerdata/${userId}`);
  };
  const navigateToInbox = () => {
    navigate("/inbox", {
      state: {
        _id: _id,
        _name: name,
      },
    });
  };

  useEffect(() => {
    fetchData();
    fetchRecommendedUsers();
  }, [_id]);
  return (
    <>
      <div>
        <Row justify={"space-evenly"}>
          {" "}
          <Col lg={13} xs={24} md={24}>
            {" "}
            <div
              className="main"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                marginTop: "2rem",
              }}
            >
              <div className="profile-a">
                <div>
                  <img className="profile-pic" src={profilepic} />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: "bold" }}>{likeBtn?.name}</div>
                    <div>Graduated</div>
                    <div>{likeBtn?.Pservice}</div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "1rem",
                    }}
                  >
                    <li>2 years experience</li>
                    <li>{likeBtn?.weeklyhours}hr/week</li>
                    <li>{likeBtn?.hourrate}$/hr</li>
                    <li>in Morning</li>
                  </div>
                  <div>
                    <div>
                      <MdOutlineGppGood />
                      non-smoker
                    </div>
                    <div>
                      <MdOutlineGppGood />
                      Accept professional pay
                    </div>
                    <div>
                      <MdOutlineGppGood />
                      Accept online payments
                    </div>
                  </div>
                </div>
                <Button
                  className="end-icons"
                  onClick={navigateToInbox}
                  danger
                  type="primary"
                >
                  Chat
                </Button>
              </div>
              <div
                className="profile-b"
                style={{ display: "flex", flexDirection: "column", gap: "1px" }}
              >
                <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                  Experience
                </div>
                <p>2 years of experience</p>
                <h5>Can Help With</h5>
                <p></p>
              </div>
              <div className="profile-c">
                <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                  Service
                </div>
                <div>Cat Sitter</div>
                <div>Weekly Hours : {likeBtn?.weeklyhours}/Hours</div>
                <div>Hourly Rate: {likeBtn?.hourrate}$</div>
                <div>Availability : [{likeBtn?.available},]</div>
              </div>
              <div className="profile-d">
                <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                  Education
                </div>

                <div style={{ fontSize: "1rem" }}>Master in Business</div>
              </div>
              <div className="profile-e">
                <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                  About
                </div>
                <div>{likeBtn?.about}</div>
              </div>
              <div className="profile-f">
                <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                  Reviews
                </div>
                <div>No Reviews Available</div>
              </div>
            </div>{" "}
          </Col>
          <Col lg={5} xs={12} md={12}>
            {" "}
            <div className="people" style={{ marginTop: "3rem" }}>
              <div
                style={{
                  width: "12rem",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                }}
              >
                People You May Know
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "0.4rem",
                }}
              >
                {state.map((cUser, index) => {
                  const { name, Pservice, _id } = cUser;

                  return (
                    <>
                      <div
                        onClick={() => handleCardClick(_id)}
                        className="card1"
                        key={_id}
                        style={{
                          display: "flex",
                          marginTop: "0.4rem",
                        }}
                      >
                        <img
                          src={profilepic}
                          style={{
                            width: "2.8rem",
                            height: "2.6rem",
                            borderRadius: "5rem",
                          }}
                          alt={`Profile of ${name}`}
                        />
                        <div
                          style={{
                            marginLeft: "0.5rem",
                            marginTop: "0.5rem",
                          }}
                        >
                          {name}
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Caretakerdata;
