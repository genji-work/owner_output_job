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
