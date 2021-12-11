import React from "react";
import RegisterForm from "../components/RegisterForm";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 200px 200px;
`;

function Register() {
  return (
    <Container>
      <CheckBoxOutlinedIcon sx={{ fontSize: 200 }} />
      <h1>CREATE ACCOUNT</h1>
      <RegisterForm to="./" />
    </Container>
  );
}

export default Register;
