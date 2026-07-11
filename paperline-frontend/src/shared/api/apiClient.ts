import axios from "axios";
import { prodEndpoint, testingEndpoint } from "../constants/api";

export const apiClient = axios.create({
   baseURL: testingEndpoint,
   headers: {
      "Content-Type": "application/json",
   },
   withCredentials: true,
});


