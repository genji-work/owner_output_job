<template>
  <div class="main" id="result_main">
    <Header />
    <Search v-if="routeName === 'home'" />
    <div
      :class="`con con-home ${routeName !== 'home' ? 'other' : ''}`"
      v-if="ready"
    >
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
  created() {
    const { name = "home" } = this.$route;
    if (name === "home" || name === "main") {
      this.routeName = "home";
    } else {
      this.routeName = name;
    }
    this.$store.dispatch("dic/init");
  },
  data() {
    return {
      value: "",
      title: "",
      routeName: "home",
      ready: false
    };
  },
  computed: {
    getReady() {
      return this.$store.state.dic.ready;
    }
  },
  watch: {
    getReady(ready) {
      this.ready = ready;
    },
    $route() {
      const { name = "home" } = this.$route;
      if (name === "home" || name === "main") {
        this.routeName = "home";
      } else {
        this.routeName = name;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
