import Http from "./index";
import { readFile } from "../utils";

const http = new Http();

export const loginService = async params =>
  http.post("/users/user/login", params, "formdata");

export const logoutService = async params =>
  http.get("/users/user/logout", params);

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

export const queryUserHotService = async params =>
  http.get("/api/document/queryUserHotSearchRank.json", params);

export const queryKeywordHotService = async params =>
  http.get("/api/document/queryKeywordHotSearchRank.json", params);

export const basicInfoService = async params =>
  http.get("/users/user/info", params);

export const uploadListService = async params =>
  http.get("/api/document/myUploadDocument.json", params);

export const allLanguageService = async params =>
  http.get("/api/dict/queryAllLanguage.json", params);

export const downloadPdfService = async params =>
  http.get("/api/file/download.json", params);

export const saveDocService = async params =>
  http.post("/api/document/saveDocument.json", params);

export const collectListService = async params =>
  http.get("/api/document/queryMyStoreList.json", params);

export const ipPvService = async params =>
  http.get("/api/visits/iPChartData.json", params);

export const visitService = async params =>
  http.post("/api/visits/visit", params);

export const queryTxtService = async params => {
  const { country, id, page } = params;
  return readFile(`/api/file/preview/${country}/${id}/p${page}.txt`);
};

export const collectService = async params =>
  http.post("/api/document/saveDocumentStore.json", params);

export const downloadService = params =>
  http.get("/api/file/download.json", params);

export const collectCancelService = async params =>
  http.post("/api/document/cancelDocumentStore.json", params);

export const updatePasswordService = async params =>
  http.post("/users/user/update/password", params);
