import { Nexios } from "nexios-http";
import { NexiosOptions } from "nexios-http/types/interfaces";
import { cookies } from "next/headers";

import envConfig from "./envConfig";


// Default configuration for Nexios
const defaultConfig: NexiosOptions = {
  baseURL: envConfig.baseApi,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  credentials: "include",
  timeout: 10000,
};

const nexiosInstance = new Nexios(defaultConfig);

// Add request interceptor
nexiosInstance.interceptors.request.use((config) => {
  const accessToken = cookies().get("accessToken")?.value;

  if (accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: `${accessToken}`,
    };
  }

  return config;
});

// Add response interceptor
nexiosInstance.interceptors.response.use((response) => {
  // Transform response data if needed
  return response;
});

export default nexiosInstance;