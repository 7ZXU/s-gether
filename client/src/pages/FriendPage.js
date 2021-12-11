import react, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import styled from "styled-components";
import { LocalizationProvider, StaticDatePicker } from "@mui/lab";
import { format } from "date-fns";
import { TextField } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import CheckboxList from "../components/CheckboxList";
import Thumbnail from "../components/Thumbnail";
import { getCookie } from "../cookie";

export default function FriendPage({ friendpage, history }) {
  let token = getCookie("myToken");

  const FeedWrap = styled.div`
    display: flex;
    margin: 200px 200px;
  `;

  const CalendarWrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 40%;
    justify-content: space-around;
  `;

  const User = styled.text`
    font-size: 50px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 20px;
  `;

  const CheckboxListWrap = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    width: 20%;
  `;

  const location = useLocation();
  const sch = location.search; // 받아온 쿼리 sch 저장

  const [value, setValue] = useState(new Date());
  const [lists, setLists] = useState([]);
  const [photos, setPhotos] = useState([]);

  const params = new URLSearchParams(sch);
  const friend_name = params.get("friend_name"); // 쿼리에서 friend_id 변수 받아옴



  // api/friends 는 친구 아이디를 가져옴
  // id 가 아니라 닉네임 띄워야 함

  async function loadPhoto() {
    await axios
      .post("http://localhost:5000/api/friendPhotolist", {
        nickname: friend_name,
        date: format(value, "yyyy-MM-dd"),
      })
      .then((res) => {
        setPhotos(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    token = getCookie("myToken");

    async function loadFriendPage() {
      await axios
        .post("http://localhost:5000/api/friendpage", {
          friend: friend_name,
        })
        .then((res) => {})
        .catch((err) => {});
    }
    loadFriendPage();



    loadPhoto();
  }, []);

  // const loadComment = () => {
  //   history.push({
  //     pathname: "./",
  //     state: {
  //       date: `${value}`,
  //       token: `${token}`,
  //     },
  //   });
  // };

  return (
    <FeedWrap>
      <CalendarWrap>
        <User>{friend_name}</User>
        <LocalizationProvider dateAdapter={AdapterDateFns} sx={{ width: 800 }}>
          <StaticDatePicker
            sx={{
              width: 800,
              innerWidth: 800,
              outerWidth: 800,
              innerHeight: 800,
              outerHeight: 800,
            }}
            displayStaticWrapperAs="desktop"
            value={value}
            onChange={(newValue) => {
              
              setValue(newValue);

          
              // todolist post
              async function loadList() {
                await axios
                  .post("http://localhost:5000/api/friendtodolist", {
                    name: friend_name,
                    day: format(newValue, "yyyy-MM-dd"),
                  })
                  .then((res) => {
                    setLists(res.data.result);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }

              loadList();

              async function loadPhoto() {
                await axios
                  .post("http://localhost:5000/api/friendPhotolist", {
                    nickname: friend_name,
                    date: format(newValue, "yyyy-MM-dd"),
                  })
                  .then((res) => {
                    setPhotos(res.data.result);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
              loadPhoto();

            }}
      

            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <Thumbnail slides={photos} num={3} />


        {/* 버튼 클릭하면 history.push로 전달 */}
        <button
          onClick={() => {
            history.push(`/feed/image?friend_name=${friend_name}&date=${format(value,"yyyy-MM-dd")}&token=${token}&slides=${photos}`);
          }}
          style={{ margin: "40px" , textAlign:"end", fontWeight:"bold", border:"none", fontSize:"18px", backgroundColor:"transparent", marginTop:"20px",}}
        >
          ⍈ comments
        </button>
      </CalendarWrap>
      <CheckboxListWrap>
        <h1>Todo</h1>
        {lists.map((list, index) => (
          <CheckboxList list={list} key={index} show={false} /> //idx 멎나??
        ))}
      </CheckboxListWrap>
    </FeedWrap>
  );
}
