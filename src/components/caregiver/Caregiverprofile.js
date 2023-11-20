import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Form, Input, Select, Slider, Card } from "antd";
import { Checkbox, Col, Row } from "antd";
import FormItem from "antd/es/form/FormItem";
import instance from "../../helpers/BaseUrl";
const { Option } = Select;

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
    key: "My_Profile",
    tab: "My Profile",
  },
  {
    key: "password",
    tab: "Password",
  },
];

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
};

const Caregiverprofile = () => {
  const [form] = Form.useForm();
  const [activeTabKey1, setActiveTabKey1] = useState("My_Profile");
  const [activeTabKey2, setActiveTabKey2] = useState("password");
  const [Password, setPassword] = useState({
    password: "",
    confirm_password: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    phone: "",
    Pservice: "",
    hourrate: 0,
    weeklyhours: 0,
    about: "",
    password: "",
    available: "",
  });

  const userData = JSON.parse(localStorage.getItem("user"))?._id;

  const updateData = (e) => {
    console.log("Updating data...");
    const name = e.target.name;
    const value = e.target.value;
    console.log("Name:", name);
    console.log("Value:", value);
    setFormData({ ...formData, [name]: value });
  };
  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };
  const upDatePassword = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPassword({ ...Password, [name]: value });
  };
  const fetchData = async () => {
    try {
      const res = await instance.get(`/petsitter-profile/${userData}`);
      const responseData = res.data.checkUser[0];
      setFormData(responseData);
      form.setFieldsValue(responseData);
    } catch (error) {
      console.log(error);
    }
  };
  const patchData = async () => {
    try {
      const res = await instance.patch(
        `/petsitter-profile/${userData}`,
        formData
      );
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
    } catch (error) {
      console.log(error);
    }
  };
  const patchPassword = async () => {
    try {
      const res = await instance.patch(
        `petsitter-profile/password/${userData}`,
        Password
      );
      if (res.status === 201) {
        setPassword({
          password: "",
          confirm_password: "",
        });
        toast.success("Signup Succesfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const contentList = {
    My_Profile: (
      <>
        <Form
          {...layout}
          style={{
            maxWidth: 600,
          }}
          validateMessages={validateMessages}
          form={form}
          onFinish={patchData}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              name="name"
              value={formData.name}
              onChange={(e) => updateData(e)}
            />
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                type: "text",
              },
            ]}
          >
            <Input
              name="username"
              value={formData.username}
              onChange={(e) => updateData(e)}
            />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              {
                type: "tel",
              },
            ]}
          >
            <Input
              name="phone"
              value={formData.phone}
              onChange={(e) => updateData(e)}
            />
          </Form.Item>

          <Form.Item
            name="Pservice"
            label="Service"
            value={formData?.Pservice}
            rules={[
              {
                required: true,
                message: "Please select service",
              },
            ]}
          >
            <Select
              placeholder="Select your service"
              onChange={(value) =>
                updateData({ target: { name: "Pservice", value } })
              }
            >
              <Option value="Cat Sitter">Cat Sitter</Option>
              <Option value="Dog Sitter">Dog Sitter</Option>
              <Option value="Bird Sitter">Bird Sitter</Option>
            </Select>
          </Form.Item>
          <Form.Item name="hourrate" label="Hour_rate">
            <div>
              <Slider
                value={formData?.hourrate}
                onChange={(value) =>
                  setFormData({ ...formData, hourrate: value })
                }
              />
              <h4 style={{ textAlign: "center" }}>{formData?.hourrate}$/hr</h4>
            </div>
          </Form.Item>
          <Form.Item name="weeklyhours" label="Weekly_Hours">
            <div>
              <Slider
                value={formData?.weeklyhours}
                onChange={(value) =>
                  setFormData({ ...formData, weeklyhours: value })
                }
              />
              <h4 style={{ textAlign: "center" }}>{formData?.weeklyhours}hr</h4>
            </div>
          </Form.Item>
          <FormItem name="available" label="Available">
            <Checkbox.Group
              style={{ width: "100%" }}
              value={formData?.available}
              onChange={(value) =>
                setFormData({ ...formData, available: value })
              }
            >
              <Row style={{ height: "10rem" }}>
                <Col span={8}>
                  <Checkbox value="Monday">Monday</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="Tuesday">Tuesday</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="Wednesday">Wednesday</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="Thursday">Thursday</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="Friday">Friday</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="Saturday">Saturday</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="Sunday">Sunday</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </FormItem>
          <Form.Item
            name="about"
            label="About"
            rules={[
              {
                type: "text",
              },
            ]}
          >
            <Input.TextArea
              name={"about"}
              value={formData?.about}
              onChange={(e) => updateData(e)}
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 8,
            }}
          >
            <Button type="primary" htmlType="submit" onClick={patchData} danger>
              Update
            </Button>
          </Form.Item>
        </Form>
      </>
    ),
    password: (
      <Form
        name="basic"
        form={form}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Form.Item
          name="password" // Change the name from "password" to "newpassword"
          label="New Password" // You can also update the label if needed
          rules={[
            {
              required: true,
              message: "Please input your new password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            name="password"
            value={Password?.password}
            onChange={upDatePassword}
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["newpassword"]} // Update the dependency name if needed
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  // Update the field name here as well
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            value={Password?.confirm_password}
            name="confirm"
            onChange={upDatePassword}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" onClick={patchPassword} danger>
            Submit
          </Button>
        </Form.Item>
      </Form>
    ),
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Row>
        <Col xs={24}>
          {" "}
          <Card
            style={{
              width: "100%",
              padding: "2rem",
              margin: "0px",
            }}
            tabList={tabList}
            activeTabKey={activeTabKey1}
            onTabChange={onTab1Change}
          >
            {contentList[activeTabKey1]}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Caregiverprofile;
