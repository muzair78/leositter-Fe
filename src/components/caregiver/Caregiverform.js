import cat from "../../assets/pet-care.jpg";
import React, { useState } from "react";
import axios from "axios";
import { RiAccountPinCircleFill } from "react-icons/ri";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Button, Checkbox, Col, Form, Input, Row, Select, Space } from "antd";
import "./JoinNow.css";
import { useNavigate } from "react-router-dom";
import instance from "../../helpers/BaseUrl";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 32 },
};
const { Option } = Select;

const Caregiverform = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      if (values.password !== values.cpassword) {
        toast.error("Passwords do not match");
        return;
      }
      const res = await instance.post("/signup", values);

      if (res.status === 201) {
        form.resetFields();
        localStorage.setItem("user", JSON.stringify(res.data.data));
        navigate("/jobForm");
        toast.success("Signup Succesfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="parent-div-pet">
        <Row justify={"space-between"}>
          <Col lg={12} md={12} sm={24} xs={24}>
            <div className="pet-img">
              <img src={cat} className="cat-img" alt="abc" />
            </div>
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            {" "}
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
            <Form
              {...layout}
              name="basic"
              onFinish={onFinish}
              className="form-child"
              style={{ marginTop: "1rem" }}
            >
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Name is required" }]}
              >
                <Input placeholder="Your Name" />
              </Form.Item>

              <Form.Item
                name="username"
                rules={[{ required: true, message: "Username is required" }]}
              >
                <Input placeholder="Your Username" />
              </Form.Item>

              <Form.Item
                name="phone"
                rules={[{ required: true, message: "Phone is required" }]}
              >
                <Input placeholder="Your phone number" />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[{ required: true, message: "Email is required" }]}
              >
                <Input placeholder="Enter Email" type="email" />
              </Form.Item>

              <Form.Item
                name="Pservice"
                rules={[{ required: true, message: "Service is required" }]}
              >
                <Select
                  placeholder="Which service do you offer?"
                  onChange={(value) => form.setFieldsValue({ Pservice: value })}
                >
                  <Option value="Cat Sitter">Cat Sitter</Option>
                  <Option value="Dog Sitter">Dog Sitter</Option>
                  <Option value="Bird Sitter">Bird Sitter</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: "Password is required" }]}
              >
                <Input placeholder="Create a strong password" type="password" />
              </Form.Item>

              <Form.Item
                name="cpassword"
                rules={[
                  { required: true, message: "Confirm Password is required" },
                ]}
              >
                <Input placeholder="Confirm Password" type="password" />
              </Form.Item>

              <Form.Item>
                <Button danger style={{ width: "50%" }} htmlType="submit">
                  Signup
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Caregiverform;
