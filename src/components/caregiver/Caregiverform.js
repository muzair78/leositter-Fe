import cat from "../../assets/pet-care.jpg";
import React, { useState } from "react";
import axios from "axios";
import { RiAccountPinCircleFill } from "react-icons/ri";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Checkbox, Form, Input, Select, Space } from "antd";
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
        <div className="form-container">
          <div
            style={{
              textAlign: "center",
              fontSize: "4rem",
              marginTop: "1rem",
            }}
          >
            {" "}
            <RiAccountPinCircleFill style={{ color: " #ff7875" }} />
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: "bolder",
                color: " #ff7875",
              }}
            >
              PetSitter Signup
            </div>
          </div>
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 600 }}
            className="form-child"
          >
            <Form.Item label="Name">
              <Space>
                <Form.Item
                  name="name"
                  noStyle
                  rules={[{ required: true, message: "Name is required" }]}
                >
                  <Input
                    style={{ width: "20rem" }}
                    name="name"
                    placeholder="Your Name"
                    value={user.name}
                    onChange={userData}
                  />
                </Form.Item>
              </Space>
            </Form.Item>
            <Form.Item label="Name">
              <Space>
                <Form.Item
                  name="username"
                  noStyle
                  rules={[{ required: true, message: "Username is required" }]}
                >
                  <Input
                    style={{ width: "20rem" }}
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
                    style={{ width: "20rem" }}
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
                    style={{ width: "20rem" }}
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
                  onChange={(value) => setUser({ ...user, Pservice: value })}
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
                  rules={[{ required: true, message: "Password is required" }]}
                >
                  <Input
                    name="password"
                    value={user.password}
                    style={{ width: "20rem" }}
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
                  rules={[{ required: true, message: "Password is required" }]}
                >
                  <Input
                    name="cpassword"
                    style={{ width: "20rem" }}
                    placeholder="Confirm Password"
                    value={user.cpassword}
                    onChange={userData}
                    autoComplete={"off"}
                  />
                </Form.Item>
              </Space>
            </Form.Item>
            <Form.Item name="agreement" valuePropName="checked">
              <Checkbox>I have read the agreement</Checkbox>
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <button className="submit-btn" onClick={fetchUser}>
                Submit
              </button>
            </Form.Item>
          </Form>
        </div>
        <div className="pet-img">
          <img src={cat} className="cat-img" alt="abc" />
        </div>
      </div>
    </>
  );
};

export default Caregiverform;
