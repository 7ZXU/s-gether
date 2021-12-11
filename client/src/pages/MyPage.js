import React, { useEffect, useState } from "react";
import UserBlock from "../components/UserBlock";
import InfoContainer from "../components/InfoContainer";
import { getCookie } from "../cookie";
import styled from "styled-components";
import "../css/MyPage.css";

const MyPageWrap = styled.div`
  display: flex;
  margin: 150px 150px;

`;

function MyPage() {
  const [selected, setSelected] = useState("Info");
  const token = getCookie("myToken");

  const onClickInfo = () => setSelected("Info");
  const onClickSetting = () => setSelected("Setting");

  useEffect(() => {
    // 쿠키가 없으면 로그인 페이지로 이동
    if (token) {
    } else {
      window.location.replace("/");
    }
  }, []);

  return (
    <>
      <MyPageWrap>

        <div className="user-menu">
          <UserBlock></UserBlock>
        </div>
        <div className="menu-detail">
          <InfoContainer />
        </div>
      </MyPageWrap>
    </>
  );
}

export default MyPage;
