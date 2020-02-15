import axios from "axios";
import { baseURL } from "../config/config";

const adapter = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    Accept: "application/json"
  }
});

export default adapter;
