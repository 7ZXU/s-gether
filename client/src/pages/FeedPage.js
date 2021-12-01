import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Calendar from "../components/Calendar";
import Friends from "../components/Friends";
import CheckboxList from "../components/CheckboxList";
import Thumbnail from "../components/Thumbnail";
import ChallengeCard from "../components/ChallengeCard";
import axios from "axios";
import { Button, Modal, Fade, Box, Backdrop, List } from "@mui/material";
import { getCookie } from "../cookie";

const FeedWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 200px 200px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Body = styled.div`
  display: flex;
  justify-content: space-between;
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

const ChallengeWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  width: 20%;
`;
const Plus = styled.button`
  background: transparent;
  border: none;
  font-size: 100px;
  text-align: center;
`;

const Login = styled(AccountCircleIcon)``;

function FeedPage() {
  const [user, setUser] = useState("");
  const token = getCookie("myToken");
  const [lists, setLists] = useState([]);

  useEffect(() => {
    console.log(token);
    async function loadData() {
      await axios
        .post("http://localhost:5000/api/feed", {
          token: token,
        })
        .then((res) => {
          const nickname = res.data.id;
          // console.log(res.data);
          // console.log(nickname);
          setUser(nickname);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    loadData();

    async function loadList() {
      await axios
      .post("http://localhost:5000/api/todolist" , {
        token: token,
      })
      .then((res) => {
        setLists(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
    }

    loadList();
  }, []);

  const SLIDE_COUNT = 10;
  const slides = Array.from(Array(SLIDE_COUNT).keys());

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    display: "flex",
    flexDirection: "column",
    p: 4,
  };

  const onClick = () => {
    console.log(token);

    async function saveData() {
      await axios.post("http://localhost:5000/api/todo", {
        todo: todo,
        id: user,
        token: token,
      });
    }

    setOpen(false);
    saveData();
  };

  const [todo, setTodo] = useState("");

  return (
    <FeedWrap>
      <Header>
        <Friends />

        <Link to="/mypage">
          <Login sx={{ fontSize: 50 }}>login</Login>
        </Link>
      </Header>
      <Body>
        <CalendarWrap>
          <User>{user}</User>
          <Calendar />
          <Link to="/feed/image">
            <Thumbnail slides={slides} num={3} />
          </Link>
        </CalendarWrap>
        <CheckboxListWrap>
          <h1>Todo</h1>
          {lists.map((list, index) => (
            <CheckboxList list={list} key={index} />
          ))}

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
                <h1>Todo 추가 </h1>

                <input
                  type="text"
                  onBlur={(e) => {
                    setTodo(e.target.value);
                  }}
                  placeholder="할 일을 입력하세요"
                  style={{ marginBottom: "20px" }}
                />

                <Box style={{ flexDirection: "row" }}>
                  <button style={{ width: "50%" }} onClick={handleClose}>
                    취소
                  </button>
                  <button style={{ width: "50%" }} onClick={onClick}>
                    완료
                  </button>
                </Box>
              </Box>
            </Fade>
          </Modal>
          <Button onClick={handleOpen}>ADD TODO</Button>
        </CheckboxListWrap>
        <ChallengeWrap>
          <h1>Challenge</h1>
          <Link to="/myChallenge">
            <ChallengeCard />
          </Link>
          <ChallengeCard />
          <ChallengeCard />
          <Link to="/challenges">
            <Plus>+</Plus>
          </Link>
        </ChallengeWrap>
      </Body>
    </FeedWrap>
  );
}

export default FeedPage;
