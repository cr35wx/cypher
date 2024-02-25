import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//carousel component using react-slick. It is used on the homepage as < Fade/> 


function Fade() {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className="flex justify-center">
          <img 
          src={"https://images.pexels.com/photos/3277808/pexels-photo-3277808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} 
          alt="Slide 1"
          className="w-full h-full object-cover rounded mx-auto"
          />
        </div>
        <div>
          <img 
          src={"https://images.pexels.com/photos/6457561/pexels-photo-6457561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} 
          alt="Slide 2"
          className="w-full h-full object-cover rounded mx-auto"
          />
        </div>
        <div>
        <img 
          src={"https://images.pexels.com/photos/1181622/pexels-photo-1181622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} 
          alt="Slide 3"
          className="w-full h-full object-cover rounded mx-auto"
          />
        </div>
      </Slider>
    </div>
  );
}

export default Fade;