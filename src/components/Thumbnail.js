// import React, { Component } from "react";
// import Slider from "react-slick";
// import img1 from "../assets/friend1.jpeg";
// import styled from "styled-components";

// const Thumb = styled.img`

// margin: 5px 5px;
// src: ${props => props.src};
// width: 130px;
// height: 130px;
// border-radius: 5px;
// `;

// export default class Thumbnail extends Component {
//   render() {
//     const settings = {
//       dots: true,
//       infinite: true,
//       speed: 500,
//       slidesToShow: 3,
//       slidesToScroll: 3
//     };
//     return (
//       <div>
//         <Slider {...settings}>
//           <div>
//             <Thumb src = {img1} />
//           </div>
//           <div>
//             <Thumb src = {img1} />
//           </div>
//           <div>
//             <Thumb src = {img1} />
//           </div>
//           <div>
//             <Thumb src = {img1} />
//           </div>
//           <div>
//             <Thumb src = {img1} />
//           </div>
//           <div>
//             <Thumb src = {img1} />
//           </div>
//           <div>
//             <Thumb src = {img1} />
//           </div>
//           <div>
//             <Thumb src = {img1} />
//           </div>
//           <div>
//             <Thumb src = {img1} />
//           </div>
//           <div>
//             <Thumb src = {img1} />
//           </div>

//         </Slider>
//       </div>
//     );
//   }
// }

import React, { Component } from "react";
import Slider from "react-slick";
import img1 from "../assets/friend1.jpeg";
import styled from "styled-components";

const Thumb = styled.img`
  margin: 5px 5px;
  src: ${(props) => props.src};
  width: 130px;
  height: 130px;
  border-radius: 5px;
`;

export default function Thumbnail() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  return (
    <div>
      <Slider {...settings}>
        <div>
          <Thumb src={img1} />
        </div>
        <div>
          <Thumb src={img1} />
        </div>
        <div>
          <Thumb src={img1} />
        </div>
        <div>
          <Thumb src={img1} />
        </div>
        <div>
          <Thumb src={img1} />
        </div>
        <div>
          <Thumb src={img1} />
        </div>
        <div>
          <Thumb src={img1} />
        </div>
        <div>
          <Thumb src={img1} />
        </div>
        <div>
          <Thumb src={img1} />
        </div>
        <div>
          <Thumb src={img1} />
        </div>
      </Slider>
    </div>
  );
}
