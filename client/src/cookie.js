import { Cookies } from 'react-cookie';
let now = new Date();
let after10m = new Date();

const cookies = new Cookies();

export const setCookie = (name, value) => {
  after10m.setMinutes(now.getMinutes() + 10);
  return cookies.set(name, value, { expires: after10m });
};

export const getCookie = (name) => {
  return cookies.get(name);
};
