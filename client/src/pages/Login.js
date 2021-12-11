import React from "react";
import LoginForm from "../components/LoginForm";
import "../css/Login.css";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 200px 200px;
`;

function login() {
  return (
    <Container>
      <CheckBoxOutlinedIcon sx={{ fontSize: 200 }} />
      <h1>s-gether</h1>
      <div className="login-form">
        <LoginForm to="./feed" />
        <Link to="./Register" className="link__register">
          아이디가 없으신가요?
        </Link>
      </div>
    </Container>
  );
}

export default login;
