import cat from "../../assets/pet-care.jpg";
import React, { useState } from "react";
import axios from "axios";
import { RiAccountPinCircleFill } from "react-icons/ri";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Button, Checkbox, Col, Form, Input, Row, Select, Space } from "antd";
import "./JoinNow.css";
import { useNavigate } from "react-router-dom";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 32 },
};
const { Option } = Select;

const Caregiverform = () => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    phone: "",
    email: "",
    Pservice: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();
  let name, value;
  const userData = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const URL = "http://localhost:4000/signup";
  const fetchUser = (e) => {
    e.preventDefault();
    if (
      !user.name ||
      !user.username ||
      !user.phone ||
      !user.email ||
      !user.Pservice ||
      !user.password ||
      !user.cpassword
    ) {
      toast.warn("Fill All Data", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (user.password !== user.cpassword) {
      toast.warn("Password and Confirm Password should be same", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    axios
      .post(URL, user)
      .then((res) => {
        if (res.status === 201) {
          setUser({
            name: "",
            username: "",
            phone: "",
            email: "",
            Pservice: "",
            password: "",
            cpassword: "",
          });
          localStorage.setItem("user", JSON.stringify(res.data.data));
          navigate("/jobForm");
          toast.success("Signup Sucessfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          toast.error("Email Already Exist", {});
        } else {
          toast.error("An error occurred. Please try again later.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        console.error(error); // Log the error for debugging purposes
      });
  };
  return (
    <>
      <div className="parent-div-pet">
        <Row justify={"space-between"}>
          <Col lg={12}>
            {" "}
            <div className="pet-img">
              <img src={cat} className="cat-img" alt="abc" />
            </div>
          </Col>
          <Col lg={12} md={12} sm={10} xs={15}>
            {" "}
            <div className="form-container">
              <div
                className="Giverform"
                style={{ textAlign: "center", fontSize: "3rem" }}
              >
                {" "}
                <RiAccountPinCircleFill
                  style={{ color: " #ff7875", textAlign: "center" }}
                />
                <div
                  style={{
                    fontSize: "1.5rem",

                    color: " #ff7875",
                  }}
                >
                  Caregiver Signup
                </div>
              </div>
              <Form layout="horizontal" className="form-child">
                <Form.Item label="Name">
                  <Space>
                    <Form.Item
                      name="name"
                      noStyle
                      rules={[{ required: true, message: "Name is required" }]}
                    >
                      <Input
                        name="name"
                        placeholder="Your Name"
                        value={user.name}
                        onChange={userData}
                        style={{ padding: "0.3rem" }}
                      />
                    </Form.Item>
                  </Space>
                </Form.Item>
                <Form.Item label="Username">
                  <Space>
                    <Form.Item
                      name="username"
                      noStyle
                      rules={[
                        { required: true, message: "Username is required" },
                      ]}
                    >
                      <Input
                        style={{ padding: "0.3rem" }}
                        name="username"
                        placeholder="Your Username"
                        value={user.username}
                        onChange={userData}
                      />
                    </Form.Item>
                  </Space>
                </Form.Item>
                <Form.Item label="Phone">
                  <Space>
                    <Form.Item
                      name="phone"
                      noStyle
                      rules={[{ required: true, message: "Phone is required" }]}
                    >
                      <Input
                        style={{ padding: "0.3rem" }}
                        name="phone"
                        placeholder="your phone number"
                        value={user.phone}
                        onChange={userData}
                      />
                    </Form.Item>
                  </Space>
                </Form.Item>
                <Form.Item label="Email">
                  <Space>
                    <Form.Item
                      name="email"
                      noStyle
                      rules={[{ required: true, message: "Email is required" }]}
                    >
                      <Input
                        name="email"
                        style={{ padding: "0.3rem" }}
                        placeholder="Enter Email"
                        type="email"
                        value={user.email}
                        onChange={userData}
                      />
                    </Form.Item>
                  </Space>
                </Form.Item>
                <Form.Item label="Service">
                  <Form.Item
                    name="Pservice" // Corrected the name attribute to a string
                    noStyle
                    rules={[{ required: true, message: "Service is required" }]}
                    value={user.Pservice}
                    onChange={(value) => setUser({ ...user, Pservice: value })}
                  >
                    <Select
                      placeholder="Which service do you offer?"
                      onChange={(value) =>
                        setUser({ ...user, Pservice: value })
                      }
                    >
                      <Option value="Cat Sitter">Cat Sitter</Option>
                      <Option value="Dog Sitter">Dog Sitter</Option>
                      <Option value="Bird Sitter">Bird Sitter</Option>
                    </Select>
                  </Form.Item>
                </Form.Item>
                <Form.Item label="Password">
                  <Space>
                    <Form.Item
                      name="password"
                      noStyle
                      rules={[
                        { required: true, message: "Password is required" },
                      ]}
                    >
                      <Input
                        name="password"
                        value={user.password}
                        style={{ padding: "0.3rem" }}
                        placeholder="Create a strong password"
                        onChange={userData}
                        autoComplete={"off"}
                      />
                    </Form.Item>
                  </Space>
                </Form.Item>
                <Form.Item label="C_Password">
                  <Space>
                    <Form.Item
                      name="cpassword"
                      noStyle
                      rules={[
                        { required: true, message: "Password is required" },
                      ]}
                    >
                      <Input
                        name="cpassword"
                        style={{ padding: "0.3rem" }}
                        placeholder="Confirm Password"
                        value={user.cpassword}
                        onChange={userData}
                        autoComplete={"off"}
                      />
                    </Form.Item>
                  </Space>
                </Form.Item>

                <Form.Item>
                  <Button danger onClick={fetchUser} style={{ width: "50%" }}>
                    Signup
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Caregiverform;
