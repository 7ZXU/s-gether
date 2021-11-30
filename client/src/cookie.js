import {Cookies} from "react-cookie"
let now = new Date; 
let after1m = new Date();

const cookies = new Cookies()

export const setCookie = ( name, value) =>{
    after1m.setMinutes(now.getMinutes() +5);
    return cookies.set(name, value, { expires:after1m})
}

export const getCookie = (name) => {
  
    return cookies.get(name)
}