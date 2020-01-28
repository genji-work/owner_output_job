<template>
  <div class="home">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "../header";
export default {
  components: {
    Header
  },
  created() {},
  data() {
    return {
      value: "",
      title: ""
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
