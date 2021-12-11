import React, { useEffect, useState } from "react";
import InputText from "./InputText";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router";

const Button = styled.button`
  cursor: pointer;
  border: none;
  color: #000000;
  outline: none;
  width: 600px;
  line-height: 2.5rem;
  font-size: 1.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  margin-top: 1.5rem;
  font-weight: 600;

  &:hover {
    background-color: #ffffff;
    color: #000000;
  }
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DuplicateId = styled.button`
  background-color: black;
  color: white;
  width: 190px;
  font-size: 20px;
  height: 50px;
  margin-right: 10px;
`;

const DuplicatedNick = styled.button`
  background-color: black;
  color: white;
  width: 190px;
  font-size: 20px;
  height: 50px;
  margin-right: 10px;
`;

function RegisterForm({ history }) {
  history = useHistory();

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");
  const [nick, setNick] = useState("");
  const [birth, setBirth] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [checkPw, setCheckPw] = useState("X");
  const [mesId, setMesId] = useState("중복 확인");
  const [mesNick, setMesNick] = useState("중복 확인");

  // Value of Input Form
  const typeId = (e) => {
    setId(e.target.value);
  };
  const typePw = (e) => {
    setPw(e.target.value);
  };
  const typeName = (e) => {
    setName(e.target.value);
  };
  const typeNick = (e) => {
    setNick(e.target.value);
  };
  const typeBirth = (e) => {
    setBirth(e.target.value);
  };
  const typeEmail = (e) => {
    setEmail(e.target.value);
  };
  const typePhone = (e) => {
    setPhone(e.target.value);
  }

  // Duplicate ID Check
  async function handleId() {
    await axios
      .post("http://localhost:5000/api/duplicateId", {
        id: id,
      })
      .then((res) => {
        console.log(res.data.result);
        if (res.data.result) {
          setMesId("중복");
        } else {
          setMesId("사용 가능");
        }
      });
  }

  // Duplicate Nickname Check
  async function handleNick() {
    await axios
      .post("http://localhost:5000/api/duplicateNick", {
        nick: nick,
      })
      .then((res) => {
        console.log(res.data.result);
        if (res.data.result) {
          setMesNick("중복");
        } else {
          setMesNick("사용 가능");
        }
      });
  }

  // Save the imformation of User
  async function registerRequest() {
    await axios
      .post("http://localhost:5000/api/register", {
        id: id,
        password: pw,
        name: name,
        nickname: nick,
        birth: birth,
        email: email,
        phone : phone
      })
      .then((res) => {
        if (res.data.result === "error") {
          alert("중복을 확인해주세요.");
          history.push("/Register");
        } else {
          alert("회원 가입이 완료되었습니다.");
          history.replace("/Login");
        }
      });
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "50%",
      }}
    >
      <Flex>
        <InputText
          name="id"
          placeholder="ID"
          onChange={typeId}
          style={{ width: "300px" }}
        />
        <DuplicateId onClick={handleId}>{mesId}</DuplicateId>
      </Flex>
      <InputText
        name="password"
        placeholder="PW"
        type="password"
        onChange={typePw}
      />
      <Flex>
        <InputText
          name="password"
          placeholder="Check PW"
          type="password"
          onChange={(e) => {
            if (e.target.value === pw) {
              setCheckPw("O");
            } else {
              setCheckPw("X");
            }
          }}
          style={{ width: "450px" }}
        />
        <div
          style={{
            backgroundColor: "black",
            color: "white",
            fontSize: "20px",
            padding: "13px",
            marginRight: "12px",
          }}
        >
          {checkPw}
        </div>
      </Flex>
      <InputText
        name="name"
        placeholder="NAME"
        type="name"
        onChange={typeName}
      />
      <Flex>
        <InputText
          name="nickname"
          placeholder="NICKNAME"
          type="text"
          onChange={typeNick}
          style={{ width: "300px" }}
        />
        <DuplicatedNick onClick={handleNick}>{mesNick}</DuplicatedNick>
      </Flex>
      <InputText
        name="birth"
        placeholder="BIRTH"
        type="date"
        onChange={typeBirth}
      />
      <InputText
        name="phone"
        placeholder="PHONE"
        type="phone"
        onChange={typePhone}
      />
      <InputText
        name="email"
        placeholder="EMAIL"
        type="email"
        onChange={typeEmail}
      />

      <Button onClick={registerRequest}>회원가입하기</Button>
    </div>
  );
}

export default RegisterForm;
