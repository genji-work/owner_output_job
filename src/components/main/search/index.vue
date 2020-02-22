<template>
  <div class="search">
    <div class="bar">
      <el-select class="select-box" v-model="language" @change="languageChange">
        <el-option
          v-for="item in languages"
          :key="item.code"
          :label="item.name"
          :value="item.code"
        ></el-option>
      </el-select>
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
    const { languages = [] } = this._.get(this, "$store.state.dic", {});
    return {
      value: "",
      language: "china",
      languages
    };
  },
  methods: {
    valueReWrite() {
      const filter = getFilter() || {};
      const { keyword = "", language = "" } = filter;
      this.value = keyword;
      if (language) {
        this.language = language;
      } else {
        this.language = "china";
      }
      this.languages = this._.get(
        this,
        ["$store", "state", "dic", "languages"],
        []
      );
    },
    search() {
      const newPath = changeFilterGo({
        keyword: this.value,
        currentPage: 1
      });

      this.$router.push(newPath);
    },
    languageChange() {
      const newPath = changeFilterGo({
        keyword: this.value,
        language: this.language || "china",
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
