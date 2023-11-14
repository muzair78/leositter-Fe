// CaretakerLanding.js
import { Card, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import cardimg from "../../assets/shaheen-afridi.avif";
import "./care.css";
import { toast } from "react-toastify";

import axios from "axios";
import { Rate } from "antd";
import { NavLink } from "react-router-dom";
import { Button, Form, Input, Select } from "antd";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tabList = [
  {
    key: "Best Match",
    tab: "Best Match",
  },
  {
    key: "My Profile",
    tab: "My Profile",
  },
];
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const onFinish = (values) => {
  console.log(values);
};
const CaretakerLanding = () => {
  const [form] = Form.useForm();
  const [activeTabKey1, setActiveTabKey1] = useState("Best Match");
  const [activeTabKey2, setActiveTabKey2] = useState([]);
  const [activeTabKey3, setActiveTabKey3] = useState("My Profile");
  const [Password, setPassword] = useState("");
  const [UserData, setUserData] = useState({
    name: "",
    username: "",
    phone: "",
    service: "",
  });

  const user = localStorage.getItem("user");
  const JSONdata = JSON.parse(user);
  const userService = JSONdata?.service;
  const ID = JSONdata._id;

  const onTabChange = (key) => {
    setActiveTabKey1(key);
    setActiveTabKey3(key);
  };

  const FetchData = () => {
    const URL = `http://13.235.24.24:4000/caregiver/petSitters/${userService}`;
    axios
      .get(URL)
      .then((res) => {
        setActiveTabKey2(res.data.findSitter);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const FetchUserData = () => {
    const URL = `http://13.235.24.24:4000/caretaker-profile/${ID}`;
    axios.get(URL).then((res) => {
      setUserData(res.data.profileUser);
      console.log(res);
    });
  };
  const PatchData = () => {
    const URL = `http://13.235.24.24:4000/caretaker-profile/${ID}`;
    axios.patch(URL, UserData).then((res) => {
      console.log(res.data.data);
      setUserData(res.data.data);
      if (res.status === 200) {
        toast("User Update Sucessfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
  };
  const PatchPassword = () => {
    const URL = `http://13.235.24.24:4000/caretaker-profile/password/${ID}`;
    axios
      .patch(URL, { password: Password }) // Fix the typo here
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toast("Password Update Sucessfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        setPassword("");
      })

      .catch((error) => {
        console.log(error);
      });
  };
  const updateUser = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...UserData, [name]: value });
  };
  useEffect(() => {
    FetchData();
    FetchUserData();
  }, []);

  return (
    <>
      <Card
        style={{
          width: "100%",
          marginTop: "1rem",
        }}
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={onTabChange}
      >
        {activeTabKey1 === "My Profile" ? (
          <>
            {" "}
            <Form
              {...layout}
              name="nest-messages"
              onFinish={onFinish}
              style={{
                maxWidth: 600,
              }}
              form={form}
              validateMessages={validateMessages}
            >
              <Form.Item
                label="Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  name={"name"}
                  value={UserData?.name}
                  onChange={(e) => {
                    updateUser(e);
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Phone"
                rules={[
                  {
                    type: "number",
                  },
                ]}
              >
                <Input
                  value={UserData?.phone}
                  name="phone"
                  onChange={(e) => {
                    updateUser(e);
                  }}
                />
              </Form.Item>
              <Form.Item
                name="service"
                label="Service"
                initialValue={UserData?.service} // Set the initial value here
                rules={[
                  {
                    required: true,
                    message: "Please select service",
                  },
                ]}
              >
                <Select
                  onChange={(value) =>
                    updateUser({ target: { name: "service", value } })
                  }
                >
                  <Select.Option value="Cat Sitter">Cat Sitter</Select.Option>
                  <Select.Option value="Dog Sitter">Dog Sitter</Select.Option>
                  <Select.Option value="Bird Sitter">Bird Sitter</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  ...layout.wrapperCol,
                  offset: 8,
                }}
              >
                <Button type="primary" onClick={PatchData} danger>
                  Update
                </Button>
              </Form.Item>
              <Form.Item
                label="Password"
                rules={[
                  {
                    type: "text",
                  },
                ]}
              >
                <Input
                  name={"password"}
                  value={Password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  autocomplete={"off"}
                />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  ...layout.wrapperCol,
                  offset: 8,
                }}
              >
                <Button type="primary" onClick={PatchPassword} danger>
                  Update Password
                </Button>
              </Form.Item>
            </Form>
          </>
        ) : (
          <Row gutter={[16, 16]}>
            {activeTabKey2.map((cUser) => {
              const { _id, name, Pservice } = cUser;
              return (
                <Col key={_id} sm={24} md={6} lg={6}>
                  <NavLink
                    to={{
                      pathname: `/caretaker/caretakerdata/${_id}`,
                    }}
                    className="card-link"
                  >
                    <div className="container">
                      <img src={cardimg} className="card-img" alt={name} />
                      <div
                        style={{
                          fontWeight: "bold",
                          fontSize: "20px",
                          marginTop: "1rem",
                        }}
                      >
                        {name}
                      </div>
                      <div>{Pservice}</div>
                      <div>
                        <Rate disabled defaultValue={6} />
                      </div>
                    </div>
                  </NavLink>
                </Col>
              );
            })}
          </Row>
        )}
      </Card>
    </>
  );
};

export default CaretakerLanding;
