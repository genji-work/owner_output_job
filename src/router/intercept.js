const white_list = ["/"];
export const db_list = [
  "国际教育发展数据库",
  "国际教育政策数据库",
  "国际教育实践案例库"
];

export const category_map = {
  国际教育发展数据库: "develop",
  国际教育政策数据库: "policy",
  国际教育实践案例库: "practice"
};

export const intercept = router => {
  router.beforeEach((to, from, next) => {
    const {
      path,
      query: { q = "" }
    } = to;
    if (!white_list.includes(path)) {
      if (!db_list.includes(q)) {
        document.title = "北京师范大学-国际与比较教育研究院";
        next("/");
      } else {
        document.title = q;
        next();
      }
    } else {
      document.title = "北京师范大学-国际与比较教育研究院";
      next();
    }
  });
};
