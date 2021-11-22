import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import styled from "styled-components";

const Id = styled.text`
  padding-left: 10px;
  font-size: 30px;
  font-weight: bold;
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FlexRow = styled.div`
  display: flex;
`;

const PageWrap = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

export default function AvatarHeader({ id, src }) {
  return (
    <FlexRow>
      <Avatar src={src}></Avatar>
      <Id>{id}</Id>
    </FlexRow>
  );
}
