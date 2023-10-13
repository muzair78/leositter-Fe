import React from "react";
import cat from "../../assets/cat.jpg";
import "./Home.css";
import { NavLink } from "react-router-dom";

const Home2 = () => {
  return (
    <>
      <hr
        className="hr-line"
        style={{
          width: "4rem",
          fontWeight: "bold",
          marginTop: "8rem",
          color: "green",
        }}
      />
      <div className="profile-body">
        <div className="header-part">
          <h2
            style={{
              marginTop: "2rem",
              textAlign: "center",
              fontSize: "2rem",
            }}
            className="nd-head"
          >
            We're here for you at every step of the process
          </h2>
        </div>
        <div className="info-part">
          <div className="parent-cat-image">
            <img src={cat} alt="catimage" className="cat-image" />
          </div>
          <div className="right-div">
            <h3>Tell us your needs</h3>
            <p>
              Help us understand what you're looking for by answering a few
              simple questions. Help us understand what you're looking for by
              answering a few simple questions.
            </p>
            <hr style={{ width: "40rem" }} className="hr-line" />
            <h3>Browse your top matches</h3>
            <p>
              Compare pet sitters near you for their flexibility, pricing, and
              experience. Then, talk to the ones you like. Compare pet sitters
              near you for their flexibility, pricing, and experience. Then,
              talk to the ones you like.
            </p>
            <hr style={{ width: "40rem" }} className="hr-line" />
            <h3>Hire the best pet sitter</h3>
            <p>
              Schedule a time with the pet sitter of your choice and you're good
              to go! It's that easys. Schedule a time with the pet sitter of
              your choice and you're good to go! It's that easys
            </p>
            <NavLink to={"/caretaker-signup"}>
              {" "}
              <button className="body-btn-info">Find a caregiver now</button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home2;
