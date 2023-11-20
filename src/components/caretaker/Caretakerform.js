import { React } from "react";
import "./care.css";
import careimg from "../../assets/Elderly-Caregiver.jpg";
import { Button, Form, Input, Select } from "antd";
import { RiKeyLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "antd";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import instance from "../../helpers/BaseUrl";

const { Option } = Select;

const Caretakerform = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      if (values.password !== values.cpassword) {
        toast.error("Passwords do not match");
        return;
      }
      const res = await instance.post(`/joinnow/caregiver`, values);
      if (res.status === 201) {
        form.resetFields();
        navigate("/signin");
        toast.success("Signup sucessfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.log(error);
    }
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
