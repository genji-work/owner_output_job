<template>
  <div class="search">
    <div class="bar">
      <el-input
        prefix-icon="el-icon-search"
        placeholder="输入要搜索的内容"
        v-model="value"
        type="text"
        @keyup.enter.native="search"
      />
      <el-button @click="search">搜一下</el-button>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.valueReWrite();
  },
  data() {
    return {
      value: ""
    };
  },
  methods: {
    valueReWrite() {
      const {
        query: { filter = "" }
      } = this.$route;
      const filter_zip = decodeURIComponent(filter) || "";
      if (filter_zip) {
        const { keyword = "" } = JSON.parse(filter_zip) || {};
        this.value = keyword;
      }
    },
    search() {
      const {
        query: { q, filter = "" },
        path
      } = this.$route;
      const filter_zip = decodeURIComponent(filter) || "";
      let query = {};
      if (filter_zip) {
        query = JSON.parse(filter_zip) || {};
      }

      this.$router.push(
        `${path}?q=${q}&filter=${JSON.stringify({
          ...query,
          keyword: this.value
        })}`
      );
    }
  },
  watch: {
    $route: "valueReWrite"
  }
};
</script>

<style lang="scss" scoped>
@import ".";
</style>
