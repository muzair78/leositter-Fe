import React from "react";
import { useNavigate } from "react-router-dom";
import "./Signin.css";
import { Button, Checkbox, Form, Input, Row, Col } from "antd";
import "react-toastify/dist/ReactToastify.css";
import { FaLock } from "react-icons/fa6";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import instance from "../../helpers/BaseUrl";
import { ToastContainer, toast } from "react-toastify";

const Signin = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await instance.post(`/signin`, values);

      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        localStorage.setItem("token", JSON.stringify(res.data.token));
        switch (res.data.data.user.role) {
          case "petsitter":
            navigate("/petsitter-profile");
            break;
          case "caregiver":
            navigate("/care-taker");
            break;
          default:
        }
        toast.success("Login Succesfully..!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div className="login-container">
        <Row justify={"space-between"} align={"middle"}>
          <Col lg={12}>
            {" "}
            <div className="login-left"></div>
          </Col>
          <Col lg={12} md={24} sm={24} xs={24}>
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
                    autoComplete="on"
                    style={{ padding: "0.8rem" }}
                  />
                </Form.Item>
                <Form.Item
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
                    style={{ padding: "0.8rem" }}
                  />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    danger
                    htmlType="submit"
                    className="login-form-button"
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
