import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Comments from "../components/Comments";
import CommentInput from "../components/CommentInput";
import Carousel from "../components/Carousel";

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
  /* margin-left: 50px;
  width: 40%; */
  height: 400px;
  overflow-y: scroll;
  align-items: flex-start;
`;
const Submit = styled.input``;

// const CommentWrap = styled.div`
//   display: flex;
//   align-items: flex-end;
// `;

const TextInput = styled.textarea`
  margin-top: 10px;
  font-size: 20px;
  width: 80%;
  height: 100px;
`;

export default function ImagePage({ history }) {
  const [id, setId] = useState("kjs");
  const [index, setIndex] = useState(0);
  const [comment, setComment] = useState("");
  const [photos, setPhotos] = useState([]);

  // const SLIDE_COUNT = 10;
  // const slides = Array.from(Array(SLIDE_COUNT).keys());

  // 링크에서 파라미터 받아오기
  const location = useLocation();
  const sch = location.search; // 받아온 쿼리 sch 저장

  const params = new URLSearchParams(sch);
  console.log("imagepage_sch", sch);
  const friend_name = params.get("friend_name"); // 쿼리에서 friend_id 변수 받아옴
  const date = params.get("date").toString();
  const token = params.get("token");

  console.log("imagepage", friend_name, typeof date, date, token);

  const [lists, setLists] = useState([]);

  // loadList
  async function loadComment() {
    await axios
      .post("http://localhost:5000/api/loadcomment", {
        token: token,
        date: date,
        friend_name: friend_name,
      })
      .then((res) => {
        setLists(res.data.result);
        console.log("ImagePage", lists);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function loadPhoto() {
    await axios
      .post("http://localhost:5000/api/photolist", {
        token: token,
        date: date,
      })
      .then((res) => {
        setPhotos(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function loadFriendPhoto() {
    await axios
      .post("http://localhost:5000/api/friendPhotolist", {
        nickname: friend_name,
        date: date,
      })
      .then((res) => {
        setPhotos(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  // useEffect
  useEffect(() => {
    loadComment();
    if (friend_name===null){
      loadPhoto();
    } else {
      loadFriendPhoto();
    }



  }, []);

  const handleClick = () => {
    async function saveComment() {
      console.log("savecomment", token, friend_name, comment);
      await axios
        .post("http://localhost:5000/api/savecomment", {
          token: token,
          friend: friend_name,
          day: date,
          comment: comment,
        })
        .then(loadComment(), setComment(""))
        .catch((err) => {
          console.log(err);
        });
    }
    saveComment();
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <ImagePageWrap>
      <CarouselWrap>
        <Carousel photos={photos} />
      </CarouselWrap>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "50px",
          width: "40%",
        }}
      >
        <h1>Comments</h1>

        <CommentsWrap>
          {lists.map((list) => (
            <Comments id={list.comment_user_id} comment={list.comment} />
          ))}
        </CommentsWrap>

        {friend_name !== null ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-around",
            }}
          >
            <input
              type="text"
              onChange={handleChange}
              style={{ height: 100, width: "80%", borderRadius: "10px" }}
              value={comment}
            />

            <button
              onClick={handleClick}
              style={{ height: 100, border: "none" }}
            >
              ENTER
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </ImagePageWrap>
  );
}
