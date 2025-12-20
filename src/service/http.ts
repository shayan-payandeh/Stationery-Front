import { getValidatedBaseUrl } from "@/utils/baseUrl";
import axios from "axios";

const app = axios.create({
  baseURL: getValidatedBaseUrl(),
  withCredentials: true,
});

const http = {
  get: app.get,
  post: app.post,
  patch: app.patch,
  delete: app.delete,
};

export default http;
