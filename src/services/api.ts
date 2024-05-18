import axios, { AxiosInstance } from "axios";
import crypto from "crypto";

const api: AxiosInstance = axios.create({
  baseURL: process.env.API_URL,
});

const publicKey = process.env.MARVEL_PUBLIC_KEY;
const privateKey = process.env.MARVEL_PRIVATE_KEY;

const getTimestamp = () => {
  return Math.floor(Date.now() / 1000).toString();
};

const generateHash = (ts: string) => {
  return crypto
    .createHash("md5")
    .update(`${ts}${privateKey}${publicKey}`)
    .digest("hex");
};

export const authInterceptor = () => {
  const ts = getTimestamp();
  const hash = generateHash(ts);

  const config = {
    apikey: publicKey,
    ts,
    hash,
  };

  return config;
};

// api.interceptors.request.use(authInterceptor, (error) => {
//   console.error("Error intercepting request:", error);
//   return Promise.reject(error);
// });

export default api;
