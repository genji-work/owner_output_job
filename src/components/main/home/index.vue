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
import { getFilter } from "../../../utils";
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
      this.query = getFilter();
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
