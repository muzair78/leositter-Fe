import { React } from "react";
import "./care.css";
import careimg from "../../assets/Elderly-Caregiver.jpg";
import { Button, Form, Input, Select, Space } from "antd";
import axios from "axios";
import { RiKeyLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const { Option } = Select;

const Caretakerform = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    // setFormValues(values);
    const URL = "http://localhost:4000/joinnow/caregiver";
    axios
      .post(URL, values)
      .then((res) => {
        console.log(res);

        if (res.status === 201) {
          localStorage.setItem("user", JSON.stringify(res.data.data));
          navigate("/care-taker");
        }
      })
      .catch((res) => {
        if (res.status === 409) {
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
      }); // Update formValues state with the submitted values
  };
  return (
    <>
      <div className="container-1">
        <div>
          <img src={careimg} alt="careimg" className="img-care" />
        </div>
        <div className="care-form">
          <div style={{ textAlign: "center", fontSize: "3.5rem" }}>
            {" "}
            <RiKeyLine style={{ color: " #ff7875" }} />
          </div>
          <div
            style={{
              textAlign: "center",
              fontSize: "1.5rem",
              fontWeight: "2px",
            }}
          >
            Signup Caretaker
          </div>
          <Form
            name="complex-form"
            onFinish={onFinish}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600, marginTop: "2rem" }}
          >
            <Form.Item label="Username">
              <Space>
                <Form.Item
                  name="name"
                  noStyle
                  rules={[{ required: true, message: "Name is required" }]}
                >
                  <Input
                    style={{ width: "20rem" }}
                    placeholder="Full Name"
                    type="text"
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
                    style={{ width: "20rem" }}
                    placeholder="Enter Email"
                    type="email"
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
                    placeholder="Phone Number"
                    type="tel"
                  />
                </Form.Item>
              </Space>
            </Form.Item>
            <Form.Item label="Service">
              <Form.Item
                name="service" // Corrected the name attribute to a string
                noStyle
                rules={[{ required: true, message: "Service is required" }]}
              >
                <Select placeholder="Which service do you want?">
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
                    style={{ width: "20rem" }}
                    placeholder="Create a strong password"
                    autocomplete={"off"}
                  />
                </Form.Item>
              </Space>
            </Form.Item>
            <Form.Item label="Cpassword">
              <Space>
                <Form.Item
                  name="cpassword"
                  autocomplete={"off"}
                  noStyle
                  rules={[
                    { required: true, message: "Confirm Password is required" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Passwords do not match")
                        );
                      },
                    }),
                  ]}
                >
                  <Input
                    style={{ width: "20rem" }}
                    placeholder="Confirm Password"
                  />
                </Form.Item>
              </Space>
            </Form.Item>
            <Form.Item label=" " colon={false}>
              {" "}
              <Button
                type="primary"
                danger
                htmlType="submit"
                style={{ width: "10rem" }}
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Caretakerform;
