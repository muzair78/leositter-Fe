import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import profilepic from "../../assets/circle.jpg";
import { MdOutlineGppGood } from "react-icons/md";
import { Col, Row, Button } from "antd";
import instance from "../../helpers/BaseUrl";
import "./care.css";

const Caretakerdata = () => {
  const [likeBtn, setlikeBtn] = useState();
  const [state, setState] = useState([]);
  const [name, setName] = useState();
  const [dp, setDp] = useState();
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const JSONData = JSON.parse(user);
  const service = JSONData.service;
  const { _id } = useParams();

  const fetchData = async () => {
    try {
      const res = await instance.get(`/user/petSitter/${_id}`);
      setlikeBtn(res.data.findUser);
      setName(res.data.findUser.name);
      setDp(res.data.findUser.profileImg);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchRecommendedUsers = async () => {
    try {
      const res = await instance.get(
        `/user/caretaker/caretakerdata/people/${service}`
      );
      setState(res.data.findSitter);
    } catch (error) {
      console.log(error);
    }
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
  console.log(dp);
  useEffect(() => {
    fetchData();
    fetchRecommendedUsers();
  }, [_id]);
  const profileImage = dp ? dp : profilepic;
  return (
    <>
      <Row justify={"space-evenly"}>
        <Col lg={13} sm={24}>
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
                <img className="profile-pic" src={profileImage} />
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
          </div>
        </Col>
        <Col lg={6} sm={6}>
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
                const { name, _id, profileImg } = cUser;
                const peopleImg = profileImg ? profileImg : profilepic;
                console.log(cUser);
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
                        src={peopleImg}
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
    </>
  );
};

export default Caretakerdata;
