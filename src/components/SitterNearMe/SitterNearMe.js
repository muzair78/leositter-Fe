import React, { useEffect, useState } from "react";
import axios from "axios";
import "./siter.css";
import { Col, Form, Rate, Row } from "antd";
import imge1 from "../../assets/cat.jpg";
import { StarFilled } from "@ant-design/icons";
import { ImAidKit } from "react-icons/im";
import { FaHandHoldingHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";

const SitterNearMe = () => {
  const [user, setUser] = useState([]);
  const { type } = useParams();

  const fetchData = async () => {
    try {
      const URL = `http://localhost:4000/sitters/${type}`;
      const response = await axios.get(URL);
      console.log(response);
      const array = response.data.sitterData;
      if (array.length > 0) {
        setUser(array);
      }
    } catch (error) {
      console.error(error);
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
          Pservice,
        } = currentUser;
        console.log(currentUser);
        return (
          <>
            <div className="main-card" key={index}>
              <div className="leftDiv">
                <img className="imgee" src={imge1} />
              </div>
              <div className="rightDiv">
                <div
                  className="info-sec"
                  style={{ fontSize: "1.4rem", fontWeight: "bold" }}
                >
                  <div>
                    {name}
                    <span style={{ fontSize: "0.8rem" }}>({Pservice})</span>
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
                      label={<span style={{ fontSize: "1.1rem" }}>Rate</span>}
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
                  Neshia. I am 26 years old. I graduated from tougaloo college,
                  major sociology/social work. I have been caring and working
                  with children starting newborns to teens since an early age. I
                  am currently looking for different things to do while working
                  on masters degree.
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
            </div>
          </>
        );
      })}
    </>
  );
};

export default SitterNearMe;
