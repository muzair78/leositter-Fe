import { React } from "react";
import "../Home/Home.css";
import { FaCat } from "react-icons/fa";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Select } from "antd";
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

  return (
    <>
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
                marginTop: "-2.5rem",
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
                  <NavLink className={"login-btn"} onClick={logout} to={"/"}>
                    Logout
                  </NavLink>
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
