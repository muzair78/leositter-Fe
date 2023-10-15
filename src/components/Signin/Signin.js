import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signin.css";
import { Button, Checkbox, Form, Input, Row, Col } from "antd";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        <Row justify={"space-between"}>
          <Col lg={12} md={24}>
            {" "}
            <div className="login-left"></div>
          </Col>
          <Col lg={12} md={24} sm={24}>
            {" "}
            <div className="login-form">
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input
                    className="login"
                    name="email"
                    value={user.email}
                    onChange={userData}
                    autoComplete="on"
                  />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password
                    name={"password"}
                    className="password"
                    value={user.password}
                    onChange={userData}
                  />
                </Form.Item>

                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  wrapperCol={{ offset: 8, span: 16 }}
                >
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="btn"
                    onClick={fetchData}
                  >
                    Signin
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
