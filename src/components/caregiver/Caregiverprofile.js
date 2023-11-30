import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "antd/es/typography/Link";
import "react-toastify/dist/ReactToastify.css";
import { CameraOutlined, UserOutlined } from "@ant-design/icons";
import "./jobForm.css";
import {
  Button,
  Form,
  Input,
  Select,
  Slider,
  Card,
  Upload,
  Modal,
  Avatar,
} from "antd";
import { Checkbox, Col, Row } from "antd";
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

const Caregiverprofile = () => {
  const [form] = Form.useForm();
  const [activeTabKey1, setActiveTabKey1] = useState("My_Profile");
  const [Password, setPassword] = useState({
    password: "",
    confirm_password: "",
  });
  const [value, setValue] = useState({
    hourrate: "",
    weeklyhours: "",
  });
  const [file, setFile] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [fileList, setFileList] = useState(undefined);
  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = JSON.parse(localStorage.getItem("user"))?._id;
  const dp = user?.profileImg;

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
      const res = await instance.get(`/user/petsitter-profile/${user_id}`);
      const responseData = res?.data?.checkUser[0];
      form?.setFieldsValue(responseData);
      setValue(responseData);
    } catch (error) {
      console.log(error);
    }
  };
  const patchPassword = async () => {
    try {
      const res = await instance.patch(
        `/auth/petsitter-profile/password/${user_id}`,
        Password
      );
      if (res.status === 201) {
        setPassword({
          password: "",
          confirm_password: "",
        });
        toast.success("Password Update ", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel = () => setPreviewOpen(false);
  const handleUpload = (event) => {
    setFileList(event.file.originFileObj);
    setFile(URL.createObjectURL(event.file.originFileObj));
  };
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  const changeHR = (value) => {
    form.setFieldsValue({ hourrate: value });
    setValue((prevValues) => ({ ...prevValues, hourrate: value }));
  };
  const changeWH = (value) => {
    form.setFieldsValue({ weeklyhours: value });
    setValue((prevValues) => ({ ...prevValues, weeklyhours: value }));
  };
  const onFinish = async (values) => {
    console.log("Form submitted with values:", values);
    try {
      if (fileList !== undefined) {
        const formData = new FormData();
        console.log(formData);
        for (const key in values) {
          if (Array.isArray(values[key])) {
            formData.append(key, values[key]);
          } else {
            formData.append(key, values[key]);
          }
        }

        formData.append("profileImg", fileList);

        const res = await instance.patch(
          `/auth/petsitter-profile/${user_id}`,
          formData
        );
        console.log(res);
        if (res.status === 200) {
          localStorage.setItem("user", JSON.stringify(res.data));
          toast("User Update Successfully", {
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
      } else {
        const res = await instance.patch(
          `/auth/petsitter-profile/${user_id}`,
          values
        );
        if (res.status === 200) {
          toast("User Update Successfully", {
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
      }
    } catch (error) {
      console.log(error);
    }
  };
  const contentList = {
    My_Profile: (
      <>
        <Avatar
          size={100}
          src={file !== null ? file : dp ? dp : null}
          icon={<UserOutlined />}
        />
        <Upload onChange={handleUpload} className="camera-icon-pro">
          <Link to="#">
            <CameraOutlined size={16} />
          </Link>
        </Upload>
        <Form
          {...layout}
          form={form}
          name="nest-messages"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
          validateMessages={validateMessages}
          initialValues={value}
        >
          <Form.Item
            name={"name"}
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name={"phone"} label="phone">
            <Input />
          </Form.Item>
          <Form.Item name="hourrate" label="Hourly Rate">
            <Slider onChange={changeHR} value={value.hourrate} />
            <p style={{ textAlign: "center" }}>
              {form.getFieldValue("hourrate")} $/Hour
            </p>
          </Form.Item>
          <Form.Item name="weeklyhours" label="Weekly Hours">
            <Slider onChange={changeWH} value={value.weeklyhours} />
            <p style={{ textAlign: "center" }}>
              {form.getFieldValue("weeklyhours")} Hours
            </p>
          </Form.Item>
          <Form.Item
            name="service"
            label="service"
            rules={[
              {
                required: true,
                message: "Please select any!",
              },
            ]}
          >
            <Select
              placeholder="Which service do you offer?"
              onChange={(value) => form.setFieldsValue({ service: value })}
            >
              <Option value="Cat Sitter">Cat Sitter</Option>
              <Option value="Dog Sitter">Dog Sitter</Option>
              <Option value="Bird Sitter">Bird Sitter</Option>
            </Select>
          </Form.Item>
          <Form.Item name="available" label="Available">
            <Checkbox.Group
              onChange={(e) => form.setFieldsValue({ available: e })}
            >
              <Row>
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
              </Row>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item name={"about"} label="about">
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 8,
            }}
          >
            <Button type="primary" htmlType="submit" danger>
              Submit
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
