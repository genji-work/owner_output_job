<template>
  <div class="main">
    <Header />
    <Search />
    <div class="con con-home">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "./header";
import Footer from "./footer";
import Search from "./search";
export default {
  components: {
    Header,
    Footer,
    Search
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
