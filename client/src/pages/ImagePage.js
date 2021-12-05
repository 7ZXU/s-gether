import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Comments from "../components/Comments";
import CommentInput from "../components/CommentInput";
import Carousel from "../components/Carousel";
import { ConstructionOutlined, NoEncryption } from "@mui/icons-material";
import axios from "axios";
import { format } from "date-fns";
import { useLocation, useParams } from "react-router";
import { getCookie } from "../cookie";

const ImagePageWrap = styled.div`
  display: flex;
  margin: 50px 50px;
`;

const CarouselWrap = styled.div`
  width: 60%;
`;

const CommentsWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  width: 40%;
  align-items: flex-start;
`;
const Submit = styled.input``;

const CommentWrap = styled.div`
  display: flex;
  align-items: flex-end;
`;

const TextInput = styled.textarea`
  margin-top: 10px;
  font-size: 20px;
  width: 80%;
  height: 100px;
`;


export default function ImagePage() {
  const [id, setId] = useState("kjs");
  const [index, setIndex] = useState(0);
  const [comment, setComment] = useState("");
  const location = useLocation();
  const [token, setToken] = useState(location.state.token.token);
  const [friend, setFriend] = useState(location.state.friend.friend_name);
  const [date, setDate] = useState(location.state.date.value);

  // const token = getCookie("myToken");

  const SLIDE_COUNT = 10;
  const slides = Array.from(Array(SLIDE_COUNT).keys());
  
  // console.log("ImagePage/state", location.state.token);

  // localStorage.setItem("token", location.state.token.token);
  // localStorage.setItem("friend", location.state.friend.friend_name);
  // localStorage.setItem("date", location.state.date.value);

  // useEffect(() => {
  //   // const tok = localStorage.getItem("token");
  //   const fri = localStorage.getItem("friend");
  //   const dat = localStorage.getItem("date");

  //   if (fri !==null && dat!==null) {
  //     // setToken(localStorage.getItem("token"));
  //     setFriend(localStorage.getItem("friend"));
  //     setDate(localStorage.getItem("date"));

  //   }


  // },[]);


  // useEffect(() => {
  //   const tok = localStorage.getItem("token");
  //   const fri =  localStorage.getItem("friend");
  //   const dat = localStorage.getItem("date");

  //   console.log(tok, fri, dat);

  //   // if (tok !== null && fri !== null && dat !== null) {
  //     setToken(tok);
  //     setFriend(fri);
  //     setDate(dat);
  //   // }
  // }, []);



  console.log('FeedPage', token, friend, date, comment);

   // 완료

  const handleClick = () => {

    // setToken(location.state.token.token);
    // setFriend(location.state.friend.friend_name);
    // setDate(location.state.date.value);

    async function saveComment() {
      await axios
        .post("http://localhost:5000/api/savecomment", {
          token: token,
          friend: friend, 
          day: format(date, "yyyy-MM-dd"),
          comment: comment,
        })
        .then((res) => {

        })
        .catch((err) => {
          console.log(err);
        });
    }
    saveComment();
  };

  const handleChange = (e) => {
    setComment(e.target.value);
    console.log(comment);
  };
  return (
    <ImagePageWrap>
      <CarouselWrap>
        <Carousel slides={slides} />
      </CarouselWrap>

      <CommentsWrap>
        <h1>Comments</h1>
        {/* 댓글 목록 */}
        <Comments
          id="psy"
          comment="hello!"
          src="data:image/jpeg;base64,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"
        ></Comments>
        <Comments
          id="kjs"
          comment="hello!"
          src="https://mblogthumb-phinf.pstatic.net/MjAyMDAzMTNfMjA2/MDAxNTg0MDI3MzA1MTM1.ziQdHXjoSVpswgl7MkBXPOamMHIiKQKPpqjtQNkw6IMg.rkebY82ViYlYz83X1y5B7Fm6qyQkC2ZZlmHgRyJw1vAg.JPEG.d_hye97/1.jpg?type=w800"
        ></Comments>

        <div
          style={{
            display: "flex",
            flexDirection: "column-reverse",
            position: "absolute",
            top: "500px",
          }}
        >
          <CommentWrap>
            <form>
              <input
                type="text"
                onChange={handleChange}
                style={{ height: 100, width: 400, margin: 10 }}
              />
              <button
                // type="submit"
                // value="Enter"
                onClick={handleClick}
                style={{ fontSize: 20 }}
              >submit</button>
            </form>
            {/* <CommentInput id="kjs" src=""></CommentInput> */}
            {/* <TextInput rows="5"></TextInput>
            <Submit type="submit" value="Submit" onClick={submit}></Submit> */}
          </CommentWrap>
        </div>
      </CommentsWrap>
    </ImagePageWrap>
  );
}
