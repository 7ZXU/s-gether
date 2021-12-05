import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import {useState} from "react";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  outerWidth: 1 / 2,
  innerWidth: 1 / 2,
};

const Image = styled.img`
  src: ${(props) => props.src};
  width: 300px;
  height: 600px;
  border-radius: 10px;
`;

export default function Carousel({ photos }) {

  
  return (
    <div>
      <Slider {...settings}>
        {photos.map((photo) => (

            <Image src={photo} alt="img" />

        ))}
      </Slider>
    </div>
  );
}
