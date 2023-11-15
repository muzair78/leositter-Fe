import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { Button, Form, Input, Affix, Row, Col } from "antd";
import { AiOutlineSend } from "react-icons/ai";
import axios from "axios";
import "./Message.css";
import newimg from "../../assets/Naseem-Shah.webp";

const Message = () => {
  const [messages, setMessages] = useState("");
  const [chat, setChat] = useState([]);
  const [lastval, setLastval] = useState("");
  const [username, setUsername] = useState("");
  const [id, setId] = useState(null);
  const [object, setObject] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  const userName = user.name;
  const location = useLocation();

  const sendMessage = async (_id) => {
    try {
      const URL = `http://13.235.24.24:4000/send-messages/${userId}/${_id}`;
      const res = await axios.post(URL, { messages });
      if (messages === "" || messages === undefined || messages === null) {
        return;
      }
      if (res.status === 201) {
        setChat([...chat, res.data.data]);
        setMessages("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchMessages = async (_id) => {
    try {
      const URL = `http://13.235.24.24:4000/getmessage/${userId}/${_id}`;

      const res = await axios.get(URL);
      setChat(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchConvers = async () => {
    try {
      const URL = `http://13.235.24.24:4000/fetchConv/${userId}`;
      const res = await axios.get(URL);

      setObject(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (location.state) {
      let { _id } = location.state;
      let { _name } = location.state;
      setUsername(_name);
      setId(_id);
      fetchMessages(_id);
    } else {
    }
    fetchConvers();
  }, []);

  return (
    <>
      <Row justify={"space-between"} style={{ padding: "1rem 1rem 0px 1rem" }}>
        <Col style={{ height: "100%" }} lg={6} md={9} sm={24} xs={24}>
          <div className="inbox">
            <Col span={24}>
              <Input
                style={{
                  borderRadius: "2rem",
                  height: "2rem",
                  padding: "1rem",
                }}
                placeholder="Search Chat Here"
              />
            </Col>
            {object.map((value, key) => {
              const lastMessage = value.lastMessage;
              const firstmember = value.members;
              const filterData = firstmember.filter(
                (firstmember) => firstmember._id !== userId
              );

              return (
                <>
                  {filterData.map((value, key) => {
                    return (
                      <>
                        <div
                          style={{
                            backgroundColor: "white",
                            borderRadius: "0.3rem",
                            marginTop: "0.8rem",
                            height: "4rem",
                          }}
                          className="user-message"
                          key={key}
                          onClick={() => {
                            setId(value._id); // Set the id state to the clicked user's _id
                            fetchMessages(value._id);
                            setUsername(value.name); // Pass the clicked user's _id to fetchMessages
                          }}
                        >
                          <img src={newimg} className="img" alt="user avatar" />
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "0rem",
                            }}
                          >
                            <div
                              style={{
                                fontSize: "0.9rem",
                                color: "black",
                                fontWeight: "bolder",
                              }}
                            >
                              {value.name}
                            </div>
                            <div
                              className="limit-words"
                              style={{
                                fontWeight: "lighter",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {lastMessage}
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </>
              );
            })}
          </div>
        </Col>
        <Col lg={17} md={13} sm={24} xs={24}>
          {id ? (
            <div className="text" style={{ backgroundColor: "white" }}>
              <div
                style={{
                  display: "flex",
                  gap: "0.4rem",
                  alignItems: "center",
                  borderBottom: "1px solid black",
                  boxShadow: "0px 4px 4px -2px rgba(0, 0, 0, 0.1)",
                  border: "none",
                }}
              >
                <img src={newimg} alt="abc" className="img" />
                <p style={{ fontSize: "1rem", fontWeight: "bold" }}>
                  {username}
                </p>
              </div>

              <Affix style={{ overflowY: "auto" }}>
                <div className="mess-show">
                  {chat.length === 0 ? (
                    <div className="no-messages">
                      <p
                        style={{
                          textAlign: "center",
                          fontWeight: "bold",
                          marginTop: "10rem",
                        }}
                      >
                        Send Message To Start a conversation
                      </p>
                    </div>
                  ) : (
                    chat.map((val, index) => {
                      const isCurrUser = val.senderId === userId;
                      const dateString = val.created_at;
                      const date = new Date(dateString);
                      const simpleTime = date.toLocaleTimeString();
                      console.log(simpleTime);
                      return (
                        <div
                          key={index}
                          className={isCurrUser ? "mess-me" : "mess-other"}
                        >
                          {val.text}
                          <div style={{ fontSize: "10px", marginTop: "1rem" }}>
                            {" "}
                            {simpleTime}{" "}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </Affix>
              <div className="mess-input">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "0.5rem",
                    alignItems: "center",
                    paddingTop: "2.3rem",
                  }}
                >
                  <Col span={22}>
                    <div name="messages">
                      <Input
                        style={{ borderRadius: "3rem", width: "100%" }}
                        placeholder="Enter your message here"
                        value={messages}
                        onChange={(e) => setMessages(e.target.value)}
                        autoComplete="off"
                      />
                    </div>
                  </Col>

                  <div>
                    <div>
                      <AiOutlineSend
                        className="send-font"
                        onClick={() => sendMessage(id)}
                        style={{ fontSize: "2rem", color: "#ff7875" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                fontWeight: "bold",
                marginTop: "10rem",
              }}
            >
              no any conversation
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};

export default Message;
