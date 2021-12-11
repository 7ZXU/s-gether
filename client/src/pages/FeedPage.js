import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LogoutIcon from "@mui/icons-material/Logout";
import CheckboxList from "../components/CheckboxList";
import Thumbnail from "../components/Thumbnail";
import axios from "axios";
import { Button, Modal, Fade, Box, Backdrop } from "@mui/material";
import { getCookie, removeCookie } from "../cookie";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import { format } from "date-fns";
import Avatar from "@mui/material/Avatar";

import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import {Link} from "react-router-dom";

// styled component
const FeedWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 200px 200px;
`;

const Navbar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Body = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
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
  width: 60%;
`;

const Logout = styled(LogoutIcon)`
  padding-left: 10px;
`;


function FeedPage({ history }) {
  // useState 변수
  const [user, setUser] = useState("");
  const token = getCookie("myToken");
  const [lists, setLists] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [todo, setTodo] = useState("");
  const [friends, setFriends] = useState([]);
  const [value, setValue] = useState(new Date()); // 캘린더 클릭 날짜 설정
  const [day, setDay] = useState(new Date()); // 오늘 날짜 설정
  const [imgSrc, setImgSrc] = useState(""); // thumbnail에 띄울 이미지 배열 받아옴
  const [search, setSearch] = useState("");
  const [searchedId, setSearchedId] = useState("");
  const [searched, setSearched] = useState(0);


  // async function
  // 캘린더에 선택한 날짜에 따라 todo 불러옴
  async function loadList(date) {
    await axios
      .post("http://localhost:5000/api/todolist", {
        token: token,
        day: date,
      })
      .then((res) => {
        console.log("FeedPage", res.data.result);
        setLists(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function loadPhoto() {
    await axios
      .post("http://localhost:5000/api/photolist", {
        token: token,
        date: format(value, "yyyy-MM-dd"),
      })
      .then((res) => {
        setPhotos(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function loadData() {
    await axios
      .post("http://localhost:5000/api/feed", {
        token: token,
      })
      .then((res) => {
        if (res.data.nickname == null) {
          setUser(res.data.id);
        } else {
          setUser(res.data.nickname);
        }
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function loadFriends() {
    await axios
      .post("http://localhost:5000/api/friends", {
        token: token,
      })
      .then((res) => {
        setFriends(res.data.result);
        console.log("friends", friends);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function loadSendingFriend() {
    await axios
      .post("http://localhost:5000/api/loadSendingFriend", {
        token: token,
      })
      .then((res) => {
        // 친구 요청 리스트 받아오기
        console.log("Feed/nicknames", res.data.result);
        setNicknames(res.data.result);
      });
  }

  // useEffect 
  useEffect(() => {
    // 쿠키가 없으면 로그인 페이지로 이동
    if (token) {
      console.log("토큰 있음");
      console.log(token);
      loadData();
      loadList(day);
      loadFriends();
    } else {
      window.location.replace("/");
      console.log("쿠키 없음");
    }

    loadFriends();

    loadPhoto();
    loadSendingFriend();
    // loadChallenge();
  }, []);

  const [nicknames, setNicknames] = useState([]);

  const [open3, setOpen3] = useState(false);
  const handleOpen3 = () => {
    setOpen3(true);

    loadSendingFriend();
  };
  const handleClose3 = () => {
    setOpen3(false);
  };

  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => {
    setSearched(0);
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

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

  const onClickLogout = () => {
    console.log("로그아웃 클릭");

    // 쿠키 삭제
    removeCookie("myToken");
    window.location.replace("/"); // 메인 페이지로 이동
  };

  const onClick = () => {
    console.log(token);
    async function saveData() {
      await axios
        .post("http://localhost:5000/api/todo", {
          todo: todo,
          id: user,
          token: token,
          day: format(value, "yyyy-MM-dd"),
        })
        .then(loadList(format(value, "yyyy-MM-dd")));
    }
    setOpen(false);
    saveData();
    loadList(value);
  };

  const onLoadImage = (e) => {
    if (e.target.files.length) {
      const imgTarget = e.target.files[0]; // 여기서 올린 사진 첫번째꺼만 받아옴
      const fileReader = new FileReader();
      fileReader.readAsDataURL(imgTarget);
      fileReader.onload = function (e) {
        setImgSrc(e.target.result);
      };
    } else {
    }
  };

  const onUploadImage = async () => {
    console.log("Feedpage/onLoadImage", photos);

    axios
      .post("http://localhost:5000/api/uploadimage", {
        params: {
          img: imgSrc,
          date: format(value, "yyyy-MM-dd"),
          token: token,
        },
      })
      .then(loadPhoto());
  };

  // 친구들 앞 글자만 분리
  function stringAvatar(name) {
    return {
      children: `${name.split(" ")[0][0]}`,
    };
  }

  const handleSearch = async () => {
    await axios
      .post("http://localhost:5000/api/searchFriend", {
        search_friend: search,
      })
      .then((res) => {
        console.log("FeedPage/handleSearch", res.data.result);
        setSearchedId(res.data.result);
        res.data.result !== "" ? setSearched(1) : setSearched(0);
      });
  };

  return (
    <FeedWrap>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px",
          marginBottom: "20px",
        }}
      >
        <PeopleOutlineIcon style={{ fontSize: "50px" }} />
        <h1>s-gether</h1>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Navbar>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Button onClick={handleOpen3} style={{ fontSize: "20px" }}>
              📧
            </Button>
            <Button onClick={handleOpen2} style={{ fontSize: "20px" }}>
              ➕
            </Button>
            {friends.map((friend, index) => (
              <Avatar
                {...stringAvatar(friend)}
                friend={friend}
                onClick={() => {
                  console.log(friend);
                  history.push(`/friendpage?friend_name=${friend}`); // 친구 페이지로 렌더링 // 쿼리로 친구 이름 전달
                }}
              />
            ))}
          </div>
        </Navbar>

        <Logout
          sx={{ fontSize: 30, cursor: "pointer" }}
          onClick={onClickLogout}
        ></Logout>
      </div>

      <Body>
        <CalendarWrap>
          <Link to = "/mypage" style={{textDecoration:"none" }} >
          <User>{user}</User>
          </Link>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            sx={{ width: 800 }}
          >
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
                    .post("http://localhost:5000/api/todolist", {
                      token: token,
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
                    .post("http://localhost:5000/api/photolist", {
                      token: token,
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
              // Wed Dec 22 2021 21:10:22 GMT+0900 (한국 표준시)

              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <Thumbnail slides={photos} num={3} />
          <button
            onClick={() => {
              history.push(
                `/feed/image?date=${format(
                  value,
                  "yyyy-MM-dd"
                )}&token=${token}&slides=${photos}`
              );
            }}
            style={{
              marginTop: "20px",
              backgroundColor: "transparent",
              textAlign: "end",
              fontWeight: "bold",
              border: "none",
              fontSize: "18px",
            }}
          >
            ⍈ comments
          </button>
        </CalendarWrap>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "40%",
            marginLeft: "30px",
          }}
        >
          <CheckboxListWrap>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h1>Todo</h1>
              <Button onClick={handleOpen} style={{ fontSize: "30px" }}>
                ➕
              </Button>
            </div>

            {lists.map((list, index) => (
              <CheckboxList
                list={list}
                key={index}
                show={"1"}
                loadList={loadList}
                value={format(value, "yyyy-MM-dd")}
              /> //idx 멎나??
            ))}
          </CheckboxListWrap>

          <div>
            {/* todo 추가 모달 */}
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
                    style={{
                      marginBottom: "20px",
                      fontSize: "20px",
                      borderTop: "none",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  />

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <button
                      style={{
                        width: "45%",
                        fontSize: "25px",
                        fontWeight: "bold",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                      onClick={handleClose}
                    >
                      ✕
                    </button>
                    <button
                      style={{
                        width: "45%",
                        fontSize: "25px",
                        fontWeight: "bold",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                      onClick={onClick}
                    >
                      ❍
                    </button>
                  </div>
                </Box>
              </Fade>
            </Modal>

            {/* 친구 추가 모달 */}
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open2}
              onClose={handleClose2}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open2}>
                <Box sx={style}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h1>친구 요청 보내기</h1>
                    <button
                      style={{
                        fontSize: "25px",
                        fontWeight: "bold",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                      onClick={handleClose2}
                    >
                      ✕
                    </button>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <input
                      name="search"  
                      type="text"
                      onBlur={(e) => {
                        setSearch(e.target.value);
                      }}
                      placeholder="찾고 싶은 친구 이름을 입력하세요"
                      style={{
                        fontSize: "20px",
                        borderTop: "none",
                        borderLeft: "none",
                        borderRight: "none",
                        width: "80%",
                      }}
           
                    />

                    <button
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                      onClick={handleSearch}
                    >
                      검색
                    </button>
                  </div>

                  {searched === 1 ? (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <p style={{ marginRight: "10px" }}>
                        친구 신청을 보내시겠습니까?
                      </p>
                      <button
                        onClick={async () => {
                          await axios
                            .post("http://localhost:5000/api/sendingFriend", {
                              target_mem_id: searchedId,
                              mem_token: token,
                            })
                            .then(handleClose2(), setSearched(0));
                        }}
                      >
                        YES
                      </button>
                      <button
                        onClick={() => {
                          setSearched(0);
                          setSearchedId("");
                          handleClose2();
                        }}
                      >
                        NO
                      </button>
                    </div>
                  ) : (
                    <p>찾을 수 없는 사용자입니다.</p>
                  )}
                </Box>
              </Fade>
            </Modal>

            {/* 친구 요청 모달 */}
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open3}
              onClose={handleClose3}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open3}>
                <Box sx={style}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h1>친구 요청 받기</h1>
                    <button
                      style={{
                        fontSize: "25px",
                        fontWeight: "bold",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                      onClick={handleClose3}
                    >
                      ✕
                    </button>
                  </div>

                  {/* 친구 요청 목록 불러오기 */}
                  {nicknames.map((nickname) => (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <p>{nickname}</p>
                      <button
                        onClick={async () => {
                          const agreeName = nickname;
                          await axios
                            .post("http://localhost:5000/api/setAgree", {
                              nickname: agreeName,
                            })
                            .then((res) => {
                              handleClose3();
                              loadFriends();
                            });
                        }}
                      >
                        ✔️
                      </button>
                    </div>
                  ))}
                </Box>
              </Fade>
            </Modal>

            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <input
                type="file"
                id="input-file"
                accept="image/jpg, image/png, image/jpeg, image/gif, image/png"
                name="plan_img"
                onChange={onLoadImage}
                style={{ fontSize: "20px" }}
              />
              <Button
                onClick={onUploadImage}
                style={{ fontSize: "20px", color: "black" }}
              >
                ⇧
              </Button>
            </div>
          </div>
        </div>
      </Body>
    </FeedWrap>
  );
}

export default FeedPage;
