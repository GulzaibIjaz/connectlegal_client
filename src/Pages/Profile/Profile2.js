import React, { useState, useEffect } from "react";
import "./Profile2.css";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../../utils/api";
import StarIcon from "@mui/icons-material/Star";
import { format } from "timeago.js";
import EventNoteIcon from "@mui/icons-material/EventNote";
import NNavbar from "../Home/Navbar";

const Profile2 = () => {
  const params = useParams();

  const [lawyer, setLawyer] = useState();
  const navigate = useNavigate();
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  // useEffect(() => {
  //   api
  //     .get("/users/getUserBy?userId=" + user?.id)
  //     .then((res) => {
  //       user.picture = res.data[0].picture;
  //       user.approvalStatus = res.data[0].approvalStatus;

  //       if (res.data[0].approvalStatus === "pending") {
  //         navigate("/pending-application");
  //       } else {
  //         user.userRole === "1"
  //           ? navigate(`/profile/${params.doctorId}`)
  //           : navigate("/profile");
  //       }
  //       // console.log(user.picture);
  //     })
  //     .catch((error) => console.error(error));
  //   console.log("user>>>>> ", user);
  // }, []);
  useEffect(() => {
    console.log("running......................................", params);

    api
      .put(`/user/updateProfileViews/${params?.lawyerId}`)
      .then((res) =>
        console.log("jsbjsbmc>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", res.data)
      )
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    console.log("hakuna id");
    let id = params.lawyerId
      ? params.lawyerId
      : currentUser.id
      ? currentUser.id
      : currentUser._id;
    console.log("hakuna id", id);
    api
      .get(`/user/getUserById/${id}`)
      .then((res) => {
        setLawyer(res.data);
        console.log("matata lawyer", res.data);
        console.log("lawyer", res.data);
      })
      .catch((error) => console.error(error));
    //setting reviews
    api
      .get(
        `/review/all-reviews/${
          params.lawyerId ? params.lawyerId : currentUser.id
        }`
      )
      .then((res) => {
        console.log("res.data", res.data);
        if (res.data.length > 0) {
          let reviews = res.data;
          let count = 0;
          let total = 0;
          let array = [];
          reviews.forEach((review) => {
            count++;
            total = total + review.rating;
            array.push(review);
          });
          let ratingTemp = parseInt(total / count);
          setRating(ratingTemp);
          setRatingCount(count);
          setReviews(array);
        }
      })
      .catch((err) => alert(err.message));
  }, []);

  console.log("reviews>>>>>", reviews);
  // console.log("user", user);
  // console.log("doctor", doctor);
  useEffect(() => {
    console.log("lawyer at profile>>", lawyer);
  }, [lawyer]);
  return (
    <div className="body__wrapper">
      <NNavbar />
      <div className="lawyer__profile__page">
        <div className="main__container">
          <div className="basic__info">
            <div
              className="profile__pic"
              onClick={(e) => {
                if (currentUser?.userType == "client") {
                  navigate(`/profile/${lawyer?._id}`);
                }
              }}
            >
              <img
                className="profile__pic"
                src={
                  lawyer?.profile
                    ? lawyer?.profile
                    : "https://cdn1.iconfinder.com/data/icons/man-user-human-avatar-profile-business-person/100/03-1Advocate-512.png"
                }
              />
            </div>

            <div
              className="personal__info"
              onClick={(e) =>
                currentUser?.userType == "client" &&
                navigate(`/profile/${lawyer?._id}`)
              }
            >
              <div className="name__and__rating">
                <h1 className="name">{lawyer?.name}</h1>
                <div className="rating__container">
                  {rating == 0 ? (
                    <p>(no rating given)</p>
                  ) : (
                    <>
                      {" "}
                      {Array(parseInt(rating))
                        .fill()
                        .map((_, i) => (
                          <span>
                            <StarIcon />
                          </span>
                        ))}
                      <span>({ratingCount})</span>
                    </>
                  )}
                </div>
              </div>
              {/* <p className="education">
              {lawyer?.professionalInfo?.educations.map((edu, i) => (
                <>
                  {i > 0 && ","}{" "}
                  <>
                    {`
                ${edu?.title} (${edu?.institution})`}
                  </>
                </>
              ))}
            </p> */}
              <p className="areas__of__practices">
                Practiced in
                {lawyer?.personalInfo?.areasOfPractice.map((area, i) => (
                  <>
                    {i > 0 && ","} <>{area}</>
                  </>
                ))}
              </p>
            </div>
          </div>
          <div className="advance__info">
            <div>
              <h1>Phone no: </h1>
              <p>{lawyer?.personalInfo?.phone}</p>
            </div>
            <div>
              <h1>City of Practice: </h1>
              <p>{lawyer?.personalInfo?.cityOfPractice}</p>
            </div>
            <div>
              <h1>Office Address: </h1>
              <p>{lawyer?.personalInfo?.officeAddress}</p>
            </div>
            <div>
              <h1>License Number : </h1>
              <p>{lawyer?.personalInfo?.licenseNumber}</p>
            </div>
            <div>
              <h1>License Picture : </h1>
              <img src={lawyer?.personalInfo?.licensePicture} />
            </div>
          </div>
          <div className="educational__info">
            <h1>Education</h1>
            {lawyer?.professionalInfo?.educations.length > 0 ? (
              <>
                {lawyer?.professionalInfo?.educations.map((edu, idx) => (
                  <div>
                    <h3>{edu.title}</h3>
                    <p>
                      at {edu.institution} ({edu.startYear} - {edu.endYear})
                    </p>
                  </div>
                ))}
              </>
            ) : (
              <p>not mentioned.</p>
            )}
          </div>
          <div className="professional__info">
            <h1>Professional Experience</h1>
            {lawyer?.professionalInfo?.experiences.length > 0 ? (
              <>
                {lawyer?.professionalInfo?.experiences.map((exp, idx) => (
                  <div>
                    <h3>{exp.title}</h3>
                    <p>
                      at {exp.firm} ({exp.startYear} - {exp.endYear})
                    </p>
                  </div>
                ))}
              </>
            ) : (
              <p>not mentioned.</p>
            )}
          </div>
          <div className="portfolio">
            <h1>Potfolio Cases</h1>
            {lawyer?.professionalInfo?.portfolioItems.length > 0 ? (
              <>
                {lawyer?.professionalInfo?.portfolioItems.map((item, idx) => (
                  <div>
                    <h3>{item.title}</h3>
                    <p>from {item.description}</p>
                  </div>
                ))}
              </>
            ) : (
              <p>not provided.</p>
            )}
          </div>
          <div className="about">
            <h1>About </h1>
            <p>{lawyer?.personalInfo?.bio}</p>
          </div>
          {window.location.pathname !== "/dashboard" && (
            <div className="reviews">
              <div className="comment__box">
                <h1 className="heading">Reviews ({reviews?.length})</h1>

                <div className="comments">
                  {reviews?.length > 0 ? (
                    reviews.map((review) => (
                      <div className="review">
                        <h4>{review?.review}</h4>
                        <p>By {review?.client.name}</p>
                        <span>{format(review?.createdAt)}</span>
                      </div>
                    ))
                  ) : (
                    <h1>No reviews.</h1>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        {params.lawyerId && (
          <div className="sidebar">
            <div className="book__apointment__container">
              <h1 className="heading">Online Video Consultation</h1>
              <div className="body__data">
                <p>
                  Fee
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;{" "}
                  {lawyer?.appointmentFee} RS
                </p>
                <p>Address :&nbsp; Use Phone/Laptop for video call</p>
              </div>
              <button
                className="appointment__btn"
                onClick={(e) => navigate(`/book-appointment/${lawyer?._id}`)}
              >
                <EventNoteIcon />
                Book Appointment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile2;
