import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

const UseAxiosSecure = () => {
  return instance;
};

export default UseAxiosSecure;
