import axios from "axios";

const http = axios.create({
  baseURL: "https://todo.api.devcode.gethired.id",
});

export default http;
