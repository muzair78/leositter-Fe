// Navbar.js
import React, { useState } from "react";
import "./Navbar.css";
import { Avatar, Dropdown, Menu, Input, Button, Select } from "antd";
import {
  SearchOutlined,
  DownOutlined,
  MenuOutlined,
  CloseOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Form, NavLink, useNavigate, Link } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import { BiCopy } from "react-icons/bi";
import { FaCat } from "react-icons/fa";
import profilePhoto from "../../assets/Naseem-Shah.webp";

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/auth";
  };
  const menu = (
    <Menu>
      {/* <Menu.Item
        key="profile"
        onClick={goToProfile}
      
      >
        Profile & Settings
      </Menu.Item> */}
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );
  const studySetMenu = (
    <Menu>
      <Menu.Item
        key="logout"
        onClick={() => navigate("/study-sets/create")}
        icon={<BiCopy size={20} />}
      >
        Study sets
      </Menu.Item>
    </Menu>
  );
  const handleChange = (value, e) => {
    navigate(`/sitters/${e.value}`);
  };
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  const items = [
    {
      key: "1",
      label: "Logout",
      onClick: logout,
    },
    {
      key: "2",
      label: "null",
    },
  ];
  return (
    <>
      <nav className={`navbar ${menuOpen ? "open" : ""}`}>
        <Link className="logo" to={"/"}>
          <FaCat style={{ fontSize: "2.2rem" }} />
          LeoSitter
        </Link>
        <div className="navbar-toggle" onClick={toggleMenu}>
          {menuOpen ? <CloseOutlined /> : <MenuOutlined />}
        </div>
        <ul className={`navbar-menu ${menuOpen ? "open" : "close"}`}>
          {user ? <></> : null}
          <li>
            <Select
              defaultValue={"Select Sitter"}
              style={{ width: 200 }}
              onChange={handleChange}
              options={[
                { value: "Bird Sitter", label: "Bird Sitter" },
                { value: "Dog Sitter", label: "Dog Sitter" },
                { value: "Cat Sitter", label: "Cat Sitter" },
              ]}
            />
          </li>
          {user ? (
            <li className="onMobile">
              <Link
                to={"/inbox"}
                className={`navbar-menu ${menuOpen ? "open" : "close"}`}
              >
                <Button type="primary" danger style={{ marginTop: "1rem" }}>
                  Inbox
                </Button>
              </Link>
              <div className={"profile-btn"}>
                <Dropdown
                  menu={{
                    items,
                  }}
                  trigger={["click"]}
                >
                  <img
                    src={profilePhoto}
                    style={{
                      width: "3rem",
                      height: "3rem",
                      borderRadius: "5rem",
                      marginTop: "2rem",
                    }}
                    alt="Profile"
                  />
                </Dropdown>
              </div>
            </li>
          ) : (
            <>
              <li>
                <button
                  className="register-btn onMobile"
                  onClick={() => navigate("/signin")}
                >
                  Login
                </button>
                <button
                  style={{ marginTop: "10px" }}
                  className="register-btn onMobile"
                  onClick={() => navigate("/auth")}
                >
                  Register
                </button>
              </li>
            </>
          )}
        </ul>

        {user ? (
          <div className="profile-dropdown">
            <Link
              to={"/inbox"}
              className={`navbar-menu ${menuOpen ? "open" : "close"}`}
            >
              <Button type="primary" danger>
                Inbox
              </Button>
            </Link>
            <div className={"profile-btn"}>
              <Dropdown
                menu={{
                  items,
                }}
                trigger={["click"]}
              >
                <img
                  src={profilePhoto}
                  style={{
                    width: "3rem",
                    height: "3rem",
                    borderRadius: "5rem",
                  }}
                  alt="Profile"
                />
              </Dropdown>
            </div>
          </div>
        ) : (
          <div className="navbar-register-btn">
            <button
              className="register-btn"
              onClick={() => navigate("/signin")}
            >
              Login
            </button>
            <button
              style={{ marginLeft: "10px" }}
              className="register-btn"
              onClick={() => navigate("/joinnow")}
            >
              Register
            </button>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
