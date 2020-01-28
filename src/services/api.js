import Http from "./index";

const http = new Http();

export const loginService = async params => {
  return http.post("/users/user/login", params, "formdata");
};
