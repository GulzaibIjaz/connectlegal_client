import React from "react";
import "./HeroSection.css";
import headerImage from "../../assets/images/header__illustration.jpg";
import headerImage2 from "../../assets/images/header__illustration.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const HeroSection = () => {
  const navigate = useNavigate();
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  return (
    <div className="hero__section">
      {" "}
      <header className="home__header">
        <div className="header__content">
          <h3> We Connect Lawyers with their Potential Clients</h3>
          <h6>Get Paid for evey appointment</h6>
          <div className="buttons">
            <button
              onClick={() => navigate("/lawyers")}
              className="main__action__btn"
            >
              {/* See More <KeyboardArrowDownIcon /> */}
              Explore Lawyers
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="main__action__btn btn__two"
            >
              {/* See More <KeyboardArrowDownIcon /> */}
              Create Account
            </button>
          </div>
        </div>
        <div className="header__image">
          <img
            src={window.innerWidth > 768 ? headerImage : headerImage2}
            alt="header image"
          />
        </div>
      </header>
    </div>
  );
};

export default HeroSection;
