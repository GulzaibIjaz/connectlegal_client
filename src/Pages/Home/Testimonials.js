import React from "react";
import "./Testimonials.css";
const Testimonials = () => {
  return (
    <div className="testimonials">
      <h1>Testimonials</h1>
      <div className="testimonial__container">
        {testimonials.map((t) => (
          <div>
            <p>{t.text}</p>
            <div>
              <img src={t.photo} />
              <h1>{t.name}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const testimonials = [
  {
    name: "alsa poo",
    photo: "https://randomuser.me/api/portraits/women/76.jpg",
    text: "p2  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum incidunt, vero harum quidem asperiores nemo quisquam ullam minus  recusandae nisi neque",
  },
  {
    name: "abraham",
    photo: "https://randomuser.me/api/portraits/men/12.jpg",
    text: "p3  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum incidunt, vero harum quidem asperiores nemo quisquam ullam minus  recusandae nisi neque",
  },
  {
    name: "sheema soui",
    photo: "https://randomuser.me/api/portraits/women/33.jpg",
    text: "p4  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum incidunt, vero harum quidem asperiores nemo quisquam ullam minus  recusandae nisi neque",
  },
];
export default Testimonials;
