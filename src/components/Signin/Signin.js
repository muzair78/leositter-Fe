import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signin.css";
import { Button, Checkbox, Form, Input, Row, Col } from "antd";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaLock } from "react-icons/fa6";
import FormItem from "antd/es/form/FormItem";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const Signin = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  let name, value;
  const userData = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const navigate = useNavigate();

  const URL = "http://localhost:4000/signin";
  const fetchData = (e) => {
    e.preventDefault();

    axios
      .post(URL, user)
      .then((res) => {
        console.log(res.data.data.user.role);

        switch (res.data.data.user.role) {
          case "petsitter":
            navigate("/petsitter-profile");
            break;
          case "caregiver":
            navigate("/care-taker");
            break;
          default:
        }

        if (res.status === 200) {
          <ToastContainer />;
          toast.success("Singin sucessfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          // setUser({
          //   email: "",
          //   password: "",
          // });
          localStorage.setItem("user", JSON.stringify(res.data.data.user));
        }
      })
      .catch(() => {
        toast.error("Wrong Credentials", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };
  return (
    <>
      <div className="login-container">
        <Row justify={"space-between"} align={"middle"}>
          <Col lg={12} xs={10}>
            {" "}
            <div className="login-left"></div>
          </Col>
          <Col lg={11} sm={24} xs={24}>
            {" "}
            <div className="login-form">
              <div style={{ textAlign: "center" }}>
                <FaLock
                  style={{
                    fontSize: "6rem",
                    color: " #ff7875",
                    margin: "auto",
                    marginBottom: "2.5rem",
                  }}
                />
              </div>
              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  wrapperCol={{ span: 22 }}
                  name="email"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Enter Your Email"
                    className="login"
                    name="email"
                    value={user.email}
                    onChange={userData}
                    autoComplete="on"
                    style={{ padding: "0.8rem" }}
                  />
                </Form.Item>
                <Form.Item
                  wrapperCol={{ span: 22 }}
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Enter Your password"
                    name={"password"}
                    className="password"
                    value={user.password}
                    onChange={userData}
                    style={{ padding: "0.8rem" }}
                  />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Form.Item wrapperCol={{ span: 22 }}>
                  <Button
                    type="primary"
                    danger
                    htmlType="submit"
                    className="login-form-button"
                    onClick={fetchData}
                    style={{
                      width: "100%",
                      height: "3rem",
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontSize: "1rem",
                      // Adds 0.5rem space above and below the button
                    }}
                  >
                    Sign-in
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

export default Signin;
