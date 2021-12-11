import React, { Component } from "react";
import Slider from "react-slick";
import styled from "styled-components";

const Thumb = styled.img`
  margin: "10px 10px";
  src: ${(props) => props.src};
  width: 130px;
  height: 130px;
  border: solid 3px white;
  border-radius: 5px;
`;

export default function Thumbnail({ slides }) {

  const length = slides.length;
  let slidesToShow = 0;
  length > 2 ? slidesToShow = 3 : slidesToShow = length ;
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 3,
  };
  return (
    <div>
      <Slider {...settings}>
        {slides.map((slide) => (

            <Thumb src={slide} />

        ))}
      </Slider>
    </div>
  );
}
