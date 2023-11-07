import { React } from "react";
import "../Home/Home.css";
import { useState } from "react";
import { FaCat } from "react-icons/fa";
import "./Navbar.css";
import { Form, NavLink, useNavigate } from "react-router-dom";
import { Button, Select, Modal, Input } from "antd";
import profilePhoto from "../../assets/Naseem-Shah.webp";

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const handleChange = (value, e) => {
    navigate(`/sitters/${e.value}`);
  };
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal title="Basic Modal" open={isModalOpen} onCancel={handleCancel}>
        {" "}
      </Modal>
      ;
      <div>
        <nav className="navbar-items">
          <div>
            <NavLink to={"/"} style={{ textDecoration: "none" }}>
              <h3 className="navbar-logo">
                <FaCat style={{ fontSize: "3rem" }} />
                LeoSitter
              </h3>
            </NavLink>
            <div className="menu-icon"></div>
          </div>

          <div>
            <div
              style={{
                marginRight: "2rem",
                display: "flex",
                justifyContent: "end",
                gap: "1.2rem",
              }}
            >
              <Select
                defaultValue={"Select Sitter"}
                style={{ width: 120 }}
                onChange={handleChange}
                options={[
                  { value: "Bird Sitter", label: "Bird Sitter" },
                  { value: "Dog Sitter", label: "Dog Sitter" },
                  { value: "Cat Sitter", label: "Cat Sitter" },
                ]}
              />
              {user ? (
                <>
                  <Button type="primary" danger>
                    {" "}
                    <NavLink onClick={logout} to={"/"}>
                      Logout
                    </NavLink>
                  </Button>
                  <div className={"profile-btn"}>
                    <img
                      src={profilePhoto}
                      style={{
                        width: "3rem",
                        height: "3rem",
                        borderRadius: "5rem",
                      }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <Button type="primary" danger>
                    <NavLink to={"/signin"}>Login</NavLink>
                  </Button>
                  <Button type="primary" danger>
                    <NavLink to={"/joinnow"}>Join Now</NavLink>
                  </Button>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
