import { Cookies } from 'react-cookie';
let now = new Date();
let after10m = new Date();
let after1h = new Date();

const cookies = new Cookies();

export const setCookie = (name, value) => {
  after10m.setMinutes(now.getMinutes() + 10);
  after1h.setHours(now.getHours() + 1);
  return cookies.set(name, value, { expires: after1h });
};

export const getCookie = (name) => {
  return cookies.get(name);
};

export const removeCookie = (name) => {
  cookies.remove(name);
};
