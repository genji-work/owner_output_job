const white_list = ["/"];
export const db_list = [
  "国际教育发展数据库",
  "国际教育政策数据库",
  "国际教育实践案例库"
];

export const intercept = router => {
  router.beforeEach((to, from, next) => {
    const {
      path,
      query: { q = "" }
    } = to;
    if (!white_list.includes(path)) {
      if (!db_list.includes(q)) {
        next("/");
      } else {
        next();
      }
    } else {
      next();
    }
  });
};
