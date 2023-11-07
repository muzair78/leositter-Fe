import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { Button, Form, Input, Affix, Row, Col } from "antd";

import axios from "axios";
import "./Message.css";
import newimg from "../../assets/Naseem-Shah.webp";

const Message = () => {
  const [messages, setMessages] = useState("");
  const [chat, setChat] = useState([]);
  const [id, setId] = useState(null);
  const [object, setObject] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  const location = useLocation();

  const sendMessage = async (_id) => {
    try {
      const URL = `http://localhost:4000/send-messages/${userId}/${_id}`;
      const res = await axios.post(URL, { messages });
      console.log(res);
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
      const URL = `http://localhost:4000/getmessage/${userId}/${_id}`;
      const res = await axios.get(URL);
      setChat(res.data.data);

      console.log("API Response:", chat); // Add this line to check the response data
    } catch (error) {
      console.log(error);
    }
  };
  const fetchConvers = async () => {
    try {
      const URL = `http://localhost:4000/fetchConv/${userId}`;
      const res = await axios.get(URL);

      setObject(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (location.state) {
      let { _id } = location.state;
      setId(_id);
      fetchMessages(_id);
    } else {
      setId(userId);
      fetchMessages(userId);
    }
    fetchConvers();
  }, []);

  return (
    <>
      <Navbar user={user} />
      <Row>
        <Col lg={8} style={{ height: "100%" }}>
          <div className="inbox">
            {object.map((value, index) => {
              const vari = value.members;
              const newID = value.members[1]._id;
              const fvari = vari.filter((item) => item._id !== userId);

              return (
                <>
                  {fvari.map((val, index) => {
                    return (
                      <>
                        <div
                          className="user-message"
                          key={newID}
                          onClick={() => {
                            fetchMessages(newID);
                          }}
                        >
                          <img src={newimg} className="img" alt="user avatar" />
                          <p style={{ fontSize: "1.1rem" }}>{val?.name}</p>
                        </div>
                      </>
                    );
                  })}
                </>
              );
            })}
          </div>
        </Col>
        <Col lg={16}>
          {id ? (
            <div className="text">
              <Affix style={{ overflowY: "auto" }}>
                <div className="mess-show">
                  {chat.map((val, index) => {
                    const isCurrUser = val.senderId === userId;
                    return (
                      <div
                        key={index}
                        className={isCurrUser ? "mess-me" : "mess-other"}
                      >
                        {val.text}
                      </div>
                    );
                  })}
                </div>
              </Affix>
              <div className="mess-input">
                <form>
                  <Form.Item>
                    <Input
                      placeholder="Enter your message here"
                      name="messages"
                      value={messages}
                      onChange={(e) => setMessages(e.target.value)}
                      autoComplete="off"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button danger onClick={() => sendMessage(id)}>
                      Send
                    </Button>
                  </Form.Item>
                </form>
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
