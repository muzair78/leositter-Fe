import React, { useState } from "react";
import axios from "axios";
import { Checkbox, Col, Form, Input, Row, Slider } from "antd";
import "./jobForm.css";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

// Step components
const Step1 = ({ data, handleChange }) => {
  const [sliderValue, setSliderValue] = useState(0);

  const handleSliderChange = (value) => {
    handleChange("weeklyhours", value);
    setSliderValue(value);
  };

  return (
    <div style={{ marginLeft: "15rem", marginTop: "10rem" }}>
      <h2>Select Your Weekly Hours</h2>
      <Form.Item
        name="slider"
        label={<span style={{ fontSize: "18px" }}>Your Weekly Hours</span>}
        style={{ width: "60rem" }}
      >
        <Slider
          marks={{
            0: "0",
            20: "20",
            40: "40",
            60: "60",
            80: "80",
            100: "100",
          }}
          onChange={handleSliderChange}
        />
        <h3>{sliderValue}-Hour</h3>
      </Form.Item>
      {/* Other input fields */}
    </div>
  );
};

const Step2 = ({ data, handleChange }) => {
  const [step2, setStep2] = useState(0);
  const handleDollar = (value) => {
    handleChange("hourrate", value);
    setStep2(value);
  };
  return (
    <div style={{ marginLeft: "15rem", marginTop: "10rem" }}>
      <h2>Select Your Hour Rate</h2>
      <Form.Item
        name="slider"
        label={<span style={{ fontSize: "18px" }}>Per Hour Rate</span>}
        style={{ width: "60rem" }}
      >
        <Slider
          marks={{
            0: "0",
            20: "20",
            40: "40",
            60: "60",
            80: "80",
            100: "100",
          }}
          onChange={handleDollar}
        />
        <h3>{step2}$</h3>
      </Form.Item>
      {/* Other input fields */}
    </div>
  );
};

const Step3 = ({ data, handleChange }) => {
  const [selectedValues, setSelectedValues] = useState([]);

  const handleCheckboxChange = (checkedValues) => {
    setSelectedValues(checkedValues);
    handleChange("available", checkedValues);
  };

  return (
    <div style={{ marginLeft: "15rem", marginTop: "10rem" }}>
      <h2>My Availability:</h2>
      <Checkbox.Group
        style={{ width: "100%" }}
        value={selectedValues}
        onChange={handleCheckboxChange}
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
      {/* Other input fields */}
    </div>
  );
};

const Step4 = ({ data, handleChange }) => {
  const handleAboutChange = (e) => {
    const value = e.target.value;
    handleChange("about", value);
  };
  return (
    <div style={{ marginLeft: "15rem", marginTop: "10rem" }}>
      <h2>Tell About Yourself and Experience</h2>

      <Form.Item
        name={"about"}
        style={{ width: "60rem" }}
        rules={[{ required: true, message: "Please input Intro" }]}
        onChange={handleAboutChange}
      >
        <Input.TextArea showCount maxLength={300} />
      </Form.Item>

      {/* Other input fields */}
    </div>
  );
};
const Step5 = ({ data, handleChange, fetchData }) => {
  return (
    <div style={{ marginLeft: "15rem", marginTop: "10rem" }}>
      <h2>Are you sure for submit?</h2>
      <NavLink to="/">
        {" "}
        <button className="button-28" onClick={fetchData}>
          Submit
        </button>
      </NavLink>
    </div>
  );
};

const CaregiverAbout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    weeklyhours: 0,
    hourrate: 0,
    available: "",
    about: "",
  });
  const navigate = useNavigate();
  const userID = JSON.parse(localStorage.getItem("user"))._id;

  console.log(userID);

  console.log(userID);
  const fetchData = (id) => {
    console.log(userID);
    const URL = `http://13.235.24.24:4000/jobForm/${userID}`;
    axios({
      method: "patch",
      url: URL, // Use the URL variable instead of hardcoding the URL
      withCredentials: false,
      data: formData,
    }).then((res) => {
      console.log(res.data);
      if (res.status === 200) {
        navigate("/petsitter-profile");
      }
    });
  };

  console.log(formData);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Render the appropriate step based on the current step value
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 data={formData} handleChange={handleChange} />;
      case 2:
        return <Step2 data={formData} handleChange={handleChange} />;
      case 3:
        return <Step3 data={formData} handleChange={handleChange} />;
      case 4:
        return <Step4 data={formData} handleChange={handleChange} />;
      case 5:
        return (
          <Step5
            data={formData}
            handleChange={handleChange}
            fetchData={fetchData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {renderStep()}

      <div style={{ marginLeft: "15rem" }}>
        <button
          disabled={currentStep === 1}
          onClick={handlePrevious}
          className="previousButton"
        >
          Previous
        </button>
        <button
          disabled={currentStep === 5}
          onClick={handleNext}
          className="nextButton"
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default CaregiverAbout;
