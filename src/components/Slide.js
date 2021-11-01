import React from "react";
import Slider from "react-slick";
import styled from "styled-components";

export default function Slide({show, scroll}) {

  const state = {
    display: true,
    width: 600
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    display: true,
    width: 100,
    arrow: true 

  };

  const SliderWrap = styled.div`
  width: 800px; 
  `;



  return (
    <SliderWrap>
        <Slider {...settings}>
        <div>
          <img src="https://ww.namu.la/s/2380cb813fd70d29160b64c8ec4ffd4a5d3370688ca77f248cfb374c396f9a665ac484d7c6d1fe3abca102982ec0dac3a2c8974b1bf8e4ccdef97fec7582da4b9d9e19c591794510040ac361a2c0bfbc76790b1d16c216e807603dc82362a1c6"></img>

        </div>
        <div>
          <img src="https://ww.namu.la/s/2380cb813fd70d29160b64c8ec4ffd4a5d3370688ca77f248cfb374c396f9a665ac484d7c6d1fe3abca102982ec0dac3a2c8974b1bf8e4ccdef97fec7582da4b9d9e19c591794510040ac361a2c0bfbc76790b1d16c216e807603dc82362a1c6"></img>

        </div>
        <div>
          <img src="https://ww.namu.la/s/2380cb813fd70d29160b64c8ec4ffd4a5d3370688ca77f248cfb374c396f9a665ac484d7c6d1fe3abca102982ec0dac3a2c8974b1bf8e4ccdef97fec7582da4b9d9e19c591794510040ac361a2c0bfbc76790b1d16c216e807603dc82362a1c6"></img>

        </div>
        <div>
          <img src="https://ww.namu.la/s/2380cb813fd70d29160b64c8ec4ffd4a5d3370688ca77f248cfb374c396f9a665ac484d7c6d1fe3abca102982ec0dac3a2c8974b1bf8e4ccdef97fec7582da4b9d9e19c591794510040ac361a2c0bfbc76790b1d16c216e807603dc82362a1c6"></img>

        </div>
        <div>
          <img src="https://ww.namu.la/s/2380cb813fd70d29160b64c8ec4ffd4a5d3370688ca77f248cfb374c396f9a665ac484d7c6d1fe3abca102982ec0dac3a2c8974b1bf8e4ccdef97fec7582da4b9d9e19c591794510040ac361a2c0bfbc76790b1d16c216e807603dc82362a1c6"></img>

        </div>
        <div>
          <img src="https://ww.namu.la/s/2380cb813fd70d29160b64c8ec4ffd4a5d3370688ca77f248cfb374c396f9a665ac484d7c6d1fe3abca102982ec0dac3a2c8974b1bf8e4ccdef97fec7582da4b9d9e19c591794510040ac361a2c0bfbc76790b1d16c216e807603dc82362a1c6"></img>

        </div>
        <div>
          <img src="https://ww.namu.la/s/2380cb813fd70d29160b64c8ec4ffd4a5d3370688ca77f248cfb374c396f9a665ac484d7c6d1fe3abca102982ec0dac3a2c8974b1bf8e4ccdef97fec7582da4b9d9e19c591794510040ac361a2c0bfbc76790b1d16c216e807603dc82362a1c6"></img>

        </div>
      </Slider>
      </SliderWrap>
      


  );
}
