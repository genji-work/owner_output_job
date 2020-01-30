import router from "../router";
import { db_list } from "../router/intercept";
import _ from "lodash";

export const backLogin = () => {
  const { q = "" } = _.get(router, "history.current.query", {});
  db_list.includes(decodeURIComponent(q)) && router.push(`/login?q=${q}`);
  !db_list.includes(decodeURIComponent(q)) && router.push("/");
};
