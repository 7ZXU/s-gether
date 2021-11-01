import React from "react";
import Slider from "react-slick";
import img from "../assets/friend3.png";
import styled from "styled-components";
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1, 
  outerWidth: 1/2,
  innerWidth: 1/2
};

const Image  = styled.img`
src : ${props => props.src};
width: 100%;

`;

export default function Carousel() {

  return (
    <div>
      <Slider {...settings}>
        <div>
          <Image src={img} alt="img"/>
        </div>
        <div>
          <Image src={img} alt="img"/>
        </div>
        <div>
          <Image src={img} alt="img"/>
        </div>


      </Slider>
    </div>
  );
}
