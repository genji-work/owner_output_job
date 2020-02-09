import Http from "./index";

const http = new Http();

export const loginService = async params =>
  http.post("/users/user/login", params, "formdata");

export const logoutService = async params =>
  http.post("/users/user/logout", params);

export const docMenuService = async params =>
  http.get("/v1/docdive/documents/stats", params);

export const searchPdfService = async params =>
  http.get("/api/document/search.json", params);

export const docYearService = async params =>
  http.get("/api/document/countByYear.json", params);

export const docCountryService = async params =>
  http.get("/api/document/countByCountry.json", params);

export const dicCountryService = async params =>
  http.get("/api/document/queryCountryBelongDict.json", params);

export const dicCityService = async params =>
  http.get("/api/document/queryCountryDict.json", params);
