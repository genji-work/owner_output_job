import router from "../router";
import { db_list } from "../router/intercept";
import _ from "lodash";
const JSONParse = require("json-parse-safe");

export const backLogin = () => {
  const { q = "" } = _.get(router, "history.current.query", {});
  db_list.includes(decodeURIComponent(q)) && router.push(`/login?q=${q}`);
  !db_list.includes(decodeURIComponent(q)) && router.push("/");
};

export const getFilter = () => {
  const { filter = "" } = _.get(router, "history.current.query", {});
  const res = JSONParse(decodeURIComponent(filter));
  if (res.error) {
    return "";
  }
  return res.value;
};

export const setFilter = params => {
  let filter = getFilter() || {};
  return {
    ...filter,
    ...params
  };
};

export const changeFilterGo = params => {
  const {
    path = "",
    query: { q = "" }
  } = _.get(router, "history.current", {});
  const filter = encodeURIComponent(JSON.stringify(setFilter(params)));
  return `${path}?q=${q}&filter=${filter}`;
};

export const getPrefix = name => {
  if (name) {
    const len = name.length;
    const idx = name.lastIndexOf(".") + 1;
    let res = "";
    idx && (res = name.substring(idx, len));
    return res;
  }
  return "";
};

export const fileTypeMap = {
  pdf: "png",
  txt: "txt"
};

export const readFile = filePath => {
  // 创建一个新的xhr对象
  let xhr = null;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    // eslint-disable-next-line
    xhr = new ActiveXObject('Microsoft.XMLHTTP')
  }
  const okStatus = document.location.protocol === "file" ? 0 : 200;
  xhr.open("GET", filePath, false);
  xhr.overrideMimeType("text/html;charset=utf-8");
  xhr.send(null);
  return xhr.status === okStatus ? xhr.responseText : null;
};

export const orderFormart = order => {
  switch (order) {
    case "year_desc":
      return {
        yearSort: "1"
      };
    case "year_asc":
      return {
        yearSort: "0"
      };
    case "country_desc":
      return {
        countrySort: "1"
      };
    case "country_asc":
      return {
        countrySort: "0"
      };
    case "page_desc":
      return {
        pageSort: "1"
      };
    case "page_asc":
      return {
        pageSort: "0"
      };
    default:
      return {};
  }
};
