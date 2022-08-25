import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { setupInterceptorsTo } from "./interceptors";

const INTERPOCKET_PROD_BASE_URL = "https://interpocket.herokuapp.com/api";
// const INTERPOCKET_DEV_BASE_URL = "https://interpocket-dev.herokuapp.com/api";
// const INTERPOCKET_LOCAL_BASE_URL = "http://192.168.43.185:5000/api";

const client: AxiosInstance = axios.create({
  baseURL: INTERPOCKET_PROD_BASE_URL,
});

const interceptedAxiosClientInstance = setupInterceptorsTo(client);

type MethodEnum =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "OPTIONS"
  | "HEAD"
  | "TRACE"
  | "CONNECT";

export const apiCall = async (
  method: MethodEnum,
  route: string,
  body = null,
  token = "",
  contentType = "",
): Promise<
  | AxiosResponse<any, any>
  | AxiosError<unknown, any>
  | AxiosResponse<unknown, any>
> => {
  const onSuccess = (response: AxiosResponse): AxiosResponse => response;
  const onError = (error: AxiosError) => {
    if (error.response) {
      return error.response;
    } else {
      return error;
    }
  };

  if (token !== "") {
    interceptedAxiosClientInstance.defaults.headers.common["x-auth-token"] =
      token;
  }

  if (contentType !== "") {
    interceptedAxiosClientInstance.defaults.headers.common["Content-Type"] =
      contentType;
  }

  return interceptedAxiosClientInstance({
    method,
    url: route,
    data: body,
  })
    .then(onSuccess)
    .catch(onError);
};

export default interceptedAxiosClientInstance;
