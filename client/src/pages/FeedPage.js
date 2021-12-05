import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import MyCard from '../components/MyCard';
import Calendar from '../components/Calendar';
import CheckboxList from '../components/CheckboxList';
import Thumbnail from '../components/Thumbnail';
import ChallengeCard from '../components/ChallengeCard';
import axios from 'axios';
import { Button, Modal, Fade, Box, Backdrop, List } from '@mui/material';
import { getCookie, removeCookie } from '../cookie';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import { format } from 'date-fns';
import Avatar from '@mui/material/Avatar';
import FriendPage from './FriendPage';
import Header from '../components/Header';

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
const Logout = styled(LogoutIcon)`
  padding-left: 10px;
`;

function FeedPage({ history }) {
  const [user, setUser] = useState('');
  const token = getCookie('myToken');
  const [lists, setLists] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [todo, setTodo] = useState('');
  const [album, setAlbum] = useState([]);
  const [friends, setFriends] = useState([]);

  const [value, setValue] = useState(new Date());
  const [day, setDay] = useState(new Date());

  const [uploadFile, setUploadFile] = useState({
    file: null,
    fileName: null,
  });

  const [uploadImage, setUploadImage] = useState(false);
  const [userImage, setUserImage] = useState(null);

  const onLoadImage = (e) => {
    if (e.target.files.length) {
      const imgTarget = e.target.files[0];
      setUploadFile({
        file: e.target.files[0],
        fileName: e.target.value,
      });
      console.log(e.target.files[0]);
      console.log('fileName: ' + e.target.value);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(imgTarget);
      fileReader.onload = function (e) {
        setUserImage(e.target.result);
        setUploadImage(true);
      };
      console.log('이미지 업로드');
    } else {
      console.log('이미지추가 x');
    }
  };

  // 캘린더에 선택한 날짜에 따라 todo 불러옴
  async function loadList(date) {
    await axios
      .post('http://localhost:5000/api/todolist', {
        token: token,
        day: date,
      })
      .then((res) => {
        console.log('FeedPage', res.data.result);
        setLists(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function loadData() {
    await axios
      .post('http://localhost:5000/api/feed', {
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
      .post('http://localhost:5000/api/friends', {
        token: token,
      })
      .then((res) => {
        setFriends(res.data.result);
        console.log('friends', friends);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    // 쿠키가 없으면 로그인 페이지로 이동
    if (token) {
      console.log('토큰 있음');
      console.log(token);
      loadData();
      loadList(day);
      loadFriends();
    } else {
      window.location.replace('/');
      console.log('쿠키 없음');
    }
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

  const MyCardList = () => {
    return(
      <Box sx={{ border: 2, borderRadius: 1 }}>
        <MyCard></MyCard>
      </Box>
    )
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    display: 'flex',
    flexDirection: 'column',
    p: 4,
  };

  const onClickLogout = () => {
    console.log('로그아웃 클릭');

    // 쿠키 삭제
    removeCookie('myToken');
    window.location.replace('/'); // 메인 페이지로 이동
  };

  const onClick = () => {
    console.log(token);
    async function saveData() {
      await axios
        .post('http://localhost:5000/api/todo', {
          todo: todo,
          id: user,
          token: token,
          day: format(value, 'yyyy-MM-dd'),
        })
        .then(loadList(value));
    }

    // // 캘린더에 선택한 날짜에 따라 todo 불러옴
    // async function loadList() {
    //   await axios
    //     .post("http://localhost:5000/api/todolist", {
    //       token: token,
    //       day: day,
    //     })
    //     .then((res) => {
    //       console.log("FeedPage", res.data.result);
    //       setLists(res.data.result);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }

    setOpen(false);
    saveData();
  };

  // 친구들 앞 글자만 분리
  function stringAvatar(name) {
    return {
      children: `${name.split(' ')[0][0]}`,
    };
  }

  return (
    <FeedWrap>
      <div style={{ display: 'flex', 'justify-content': 'space-between' }}>
        <Header />
        <Logout
          sx={{ fontSize: 50, cursor: 'pointer' }}
          onClick={onClickLogout}
        ></Logout>
      </div>

      <Navbar>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
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
      <Body>
        <CalendarWrap>
          <User>{user}</User>
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
                    .post('http://localhost:5000/api/todolist', {
                      token: token,
                      day: format(newValue, 'yyyy-MM-dd'),
                    })
                    .then((res) => {
                      setLists(res.data.result);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }

                loadList();

                // async function loadPhoto() {
                //   await axios
                //     .post("http://localhost:5000/api/photolist", {
                //       token: token,
                //       date: format(newValue, "yyyy-MM-dd"),
                //     })
                //     .then((res) => {
                //       setPhotos(res.data.result);
                //       console.log(photos);
                //     })
                //     .catch((err) => {
                //       console.log(err);
                //     });
                // }
                // loadPhoto();

                // 해당 날짜를 feed 페이지에 보내야 함
              }}
              // Wed Dec 22 2021 21:10:22 GMT+0900 (한국 표준시)

              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Link to="/feed/image">
            <Thumbnail slides={photos} num={3} />
          </Link>
        </CalendarWrap>
        <CheckboxListWrap>
          <h1>Todo</h1>
          {lists.map((list, index) => (
            <CheckboxList
              list={list}
              key={index}
              show={'1'}
              loadList={loadList}
              value={value}
            /> //idx 멎나??
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
                  style={{ marginBottom: '20px' }}
                />

                <Box style={{ flexDirection: 'row' }}>
                  <button style={{ width: '50%' }} onClick={handleClose}>
                    취소
                  </button>
                  <button style={{ width: '50%' }} onClick={onClick}>
                    완료
                  </button>
                </Box>
              </Box>
            </Fade>
          </Modal>
          <Button onClick={handleOpen}>ADD TODO</Button>

          <input
            type="file"
            id="input-file"
            accept="image/jpg, image/png, image/jpeg, image/gif, image/png"
            name="plan_img"
            multiple="multiple"
            onChange={onLoadImage}
          />
        </CheckboxListWrap>
        <ChallengeWrap>
          <MyCardList/>
        </ChallengeWrap>
      </Body>
    </FeedWrap>
  );
}

export default FeedPage;
