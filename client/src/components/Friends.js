import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

function stringAvatar(name) {
  return {
    children: `${name.split(' ')[0][0]}`,
  };
}

export default function Friends() {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar {...stringAvatar('kjs')} />
      <Avatar alt="B"  />
      <Avatar alt="C"  />
    </Stack>
  );
}