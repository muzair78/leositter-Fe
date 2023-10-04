import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { Button, Form, Input, Select, Slider, Card } from "antd";
import axios from "axios";
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
  });
  const user = JSON.parse(localStorage.getItem("user"));
  const userData = JSON.parse(localStorage.getItem("user"))._id;

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

  const URL = `http://localhost:4000/petsitter-profile/${userData}`;

  const fetchData = () => {
    axios.get(URL).then((res) => {
      const responseData = res.data.checkUser[0];
      setFormData(responseData);
      form.setFieldsValue(responseData);
      console.log();
    });
  };

  const patchData = () => {
    const URL = `http://localhost:4000/petsitter-profile/${userData}`;
    axios
      .patch(URL, formData) // Stringify formData and include headers
      .then((res) => {
        console.log(res);
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
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const patchPassword = () => {
    const URL = `http://localhost:4000/petsitter-profile/password/${userData}`;
    axios
      .patch(URL, Password)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toast("Password Update Sucessfully", {
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
      })
      .catch((res) => {
        console.log(res);
      });
  };
  const contentList = {
    My_Profile: (
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
          <Button type="primary" htmlType="submit" onClick={patchData}>
            Update
          </Button>
        </Form.Item>
      </Form>
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
          <Button type="primary" onClick={patchPassword}>
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
      <Card
        style={{
          width: "100%",
        }}
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={onTab1Change}
      >
        {contentList[activeTabKey1]}
      </Card>
    </>
  );
};

export default Caregiverprofile;
