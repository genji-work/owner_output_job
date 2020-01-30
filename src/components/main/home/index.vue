<template>
  <div class="home">
    <Menu />
    <Container v-if="!query" />
    <Result v-if="query" />
  </div>
</template>

<script>
import Menu from "./menu";
import Container from "./container";
import Result from "./result";
export default {
  components: {
    Menu,
    Result,
    Container
  },
  created() {
    this.changeQuery();
  },
  data() {
    return {
      query: ""
    };
  },
  methods: {
    changeQuery() {
      const { filter = "" } = this.$route.query;
      let query = null;
      filter &&
        (() => {
          try {
            query = JSON.parse(decodeURIComponent(filter));
          } catch (e) {
            // throw new Error("没有筛选条件");
          }
        })();
      this.query = query;
    }
  },
  watch: {
    $route: "changeQuery"
  }
};
</script>

<style lang="scss" scoped>
@import ".";
</style>
