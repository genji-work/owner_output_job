<template>
  <div class="home">
    <div class="gen-box">
      <div class="gen-item">
        <i />
        <h2>国际教育发展数据库</h2>
        <p>Database for International Education Development</p>
        <el-button @click="go('国际教育发展数据库')">点击进入</el-button>
      </div>
      <div class="gen-item">
        <i />
        <h2>国际教育政策数据库</h2>
        <p>Database for International Education Polycies</p>
        <el-button @click="go('国际教育政策数据库')">点击进入</el-button>
      </div>
      <div class="gen-item">
        <i />
        <h2>国际教育实践案例库</h2>
        <p>Database for International Education Practices</p>
        <el-button @click="go('国际教育实践案例库')">点击进入</el-button>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "../footer";
export default {
  components: {
    Footer
  },
  methods: {
    go(type) {
      this.$router.push(`/login?q=${encodeURIComponent(type)}`);
    }
  }
};
</script>

<style lang="scss">
@import "./index.scss";
</style>
