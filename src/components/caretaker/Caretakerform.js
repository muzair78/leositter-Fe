import { React } from "react";
import "./care.css";
import careimg from "../../assets/Elderly-Caregiver.jpg";
import { Button, Form, Input, Select, Space } from "antd";
import axios from "axios";
import { RiKeyLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "antd";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const { Option } = Select;

const Caretakerform = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    // setFormValues(values);
    const URL = "http://13.235.24.24:4000/joinnow/caregiver";
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
        <Row justify={"space-between"}>
          <Col lg={12}>
            <img src={careimg} alt="careimg" className="img-care" />
          </Col>
          <Col md={24} lg={12} sm={24} xs={24}>
            {" "}
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
                style={{ marginTop: "1rem" }}
              >
                <Form.Item
                  name="name"
                  rules={[{ required: true, message: "Name is required" }]}
                >
                  <Input
                    placeholder="Full Name"
                    type="text"
                    style={{ padding: "0.5rem" }}
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  rules={[{ required: true, message: "Email is required" }]}
                >
                  <Input
                    placeholder="Enter Email"
                    type="email"
                    style={{ padding: "0.5rem" }}
                  />
                </Form.Item>

                <Form.Item
                  name="phone"
                  rules={[{ required: true, message: "Phone is required" }]}
                >
                  <Input
                    placeholder="Phone Number"
                    type="tel"
                    style={{ padding: "0.5rem" }}
                  />
                </Form.Item>

                <Form.Item
                  name="service" // Corrected the name attribute to a string
                  rules={[{ required: true, message: "Service is required" }]}
                >
                  <Select placeholder="Which service do you want?">
                    <Option value="Cat Sitter">Cat Sitter</Option>
                    <Option value="Dog Sitter">Dog Sitter</Option>
                    <Option value="Bird Sitter">Bird Sitter</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[{ required: true, message: "Password is required" }]}
                >
                  <Input
                    style={{ padding: "0.5rem" }}
                    placeholder="Create a strong password"
                    autocomplete={"off"}
                  />
                </Form.Item>

                <Form.Item
                  name="cpassword"
                  autocomplete={"off"}
                  rules={[
                    {
                      required: true,
                      message: "Confirm Password is required",
                    },
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
                    style={{ padding: "0.5rem" }}
                    placeholder="Confirm Password"
                    autoComplete="off"
                  />
                </Form.Item>

                <Form.Item colon={false}>
                  {" "}
                  <Button danger htmlType="submit" style={{ width: "50%" }}>
                    Sign Up
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

export default Caretakerform;
