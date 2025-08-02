import axios from "axios";

const app = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_API_URL
      : process.env.NEXT_PUBLIC_LOCAL_API_URL,
  withCredentials: true,
});

const http = {
  get: app.get,
  post: app.post,
  patch: app.patch,
  delete: app.delete,
};

export default http;
