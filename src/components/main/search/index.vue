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
import { getFilter, changeFilterGo } from "../../../utils";
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
      const filter = getFilter() || {};
      const { keyword = "" } = filter;
      this.value = keyword;
    },
    search() {
      const newPath = changeFilterGo({
        keyword: this.value,
        currentPage: 1
      });

      this.$router.push(newPath);
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
