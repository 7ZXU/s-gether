import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getCookie } from "../cookie";
import styled from "styled-components";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import Button from "@mui/material/Button";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 200px 200px;
`;

function Main() {
  const token = getCookie("myToken");

  useEffect(() => {
    // 쿠키가 없으면 로그인 페이지로 이동
    if (token) {
      window.location.replace("/feed");
    } else {
    }
  }, []);

  return (
    <Container>
      <CheckBoxOutlinedIcon sx={{ fontSize: 200 }} />
      <h1>s-gether</h1>
      <h1>함께 목표를 이루어봅시다!</h1>
      <Link to="./Login" style={{textDecoration:"none"}}>
        <Button
          variant="contained"
          color="inherit"
          sx={{ backgroundColor: "black", fontSize: "20px", color: "white"}}
        >
          이용하러 가기
        </Button>
      </Link>
    </Container>
  );
}

export default Main;
