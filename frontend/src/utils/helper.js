import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

export const tokenDecoder = (token) => {
  if (!token) return null;
  const decode = jwtDecode(token);
  const expTime = new Date(decode.exp * 1000);
  if (Date.now() > expTime) {
    return null;
  }
  return decode;
};

export const setLocalStorage = (key, value) => {
  if (!value || !key) return toast.error("invalid set local storage ");
  localStorage.setItem(key, JSON.stringify(value));
  return;
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const removeLocalStorage = (key) => {
  if (!key) return toast.error("invalid remove local storage ");
  localStorage.removeItem(key);
  return;
};

export const getLocalStorage = (key) => {
  if (!key) return toast.error("invalid key get local storage ");
  return JSON.parse(localStorage.getItem(key));
};

export const formateDate = (date) => {
  const newDate = new Date(date);
  const hour = newDate.getHours();
  const minute = newDate.getMinutes();
  return `${hour < 10 ? `0${hour}` : `${hour}`}:${minute < 10 ? `0${minute}` : `${minute}`}`;
};

export const theme = {
  dark: {
    background: "bg-[black]",
    text: "text-gray-200",
    border: "border-gray-700",
  },
  light: {
    background: "bg-gray-100",
    text: "text-gray-900",
    border: "border-gray-300",
  },
  darkStone: {
    background: "bg-stone-900",
    text: "text-stone-200",
    border: "border-stone-800",
  },
  lightStone: {
    background: "bg-blue-900",
    text: "text-blue-200",
    border: "border-blue-800",
  },
  darkBlue: {
    background: "bg-[black]",
    text: "text-gray-200",
    border: "border-gray-700",
  },
  lightBlue: {
    background: "bg-indigo-900",
    text: "text-gray-50",
    border: "border-sky-900",
  },
  darkNatural: {
    background: "bg-neutral-800",
    text: "text-neutral-200",
    border: "border-neutral-200",
  },
  lightNatural: {
    background: "bg-neutral-300",
    text: "text-neutral-900",
    border: "border-neutral-300",
  },
};

export const getThem = (mode) => {
  if (!mode) return "";
  return `${theme[mode]?.background} ${theme[mode]?.text}`;
};
export const getThemText = (mode) => {
  if (!mode) return "";
  return `${theme[mode].text}`;
};
export const getThemBackground = (mode) => {
  if (!mode) return "";
  return `${theme[mode]?.background}`;
};

export const isDark = getLocalStorage("mode") === "dark";
export const customBackground = isDark
  ? "border-r-neutral-800"
  : "border-r-neutral-300";

export const customBorderRight = isDark
  ? "border-r-[0.5px] border-r-neutral-800"
  : "border-r-[0.5px] border-r-neutral-300";

export const customBorderLeft = isDark
  ? "border-l-[0.5px] border-r-neutral-800"
  : "border-l-[0.5px] border-r-neutral-300";

export const customBorderBottom = isDark
  ? "border-b-[0.5px] border-b-neutral-800"
  : "border-b-[0.5px] border-b-neutral-300";

export const notificationBackground = isDark ? "#2D2D3D" : "#F5F5FA";
export const notificationColor = isDark ? "#E8E8F0" : "#1A1A2A";
