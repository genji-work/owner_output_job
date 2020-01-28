import router from "../router";
import { db_list } from "../router/intercept";

export const backLogin = () => {
  const { q = "" } = this._.get(this.$router, "history.current.query", {});
  db_list.includes(decodeURIComponent(q)) && router.push(`/login?q=${q}`);
  !db_list.includes(decodeURIComponent(q)) && router.push("/");
};
