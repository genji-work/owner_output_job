<template>
  <div class="container">
    <div class="item">
      <div class="half">
        <div class="title">
          <i class="el-icon-search"></i>
          <span>热门搜索</span>
        </div>
        <div class="con">
          <div class="head">
            <span class="left-head1">排名</span>
            <span class="left-head2">搜索关键词</span>
          </div>
          <div class="body">
            <div
              v-for="(item, index) in new Array(5)"
              :key="index"
              class="con-item"
            >
              <span class="left-body1">{{ index + 1 }}</span>
              <span class="left-body2">技术揭秘</span>
            </div>
          </div>
        </div>
      </div>
      <div class="half">
        <div class="title">
          <i class="visit"></i>
          <span>访问排名</span>
        </div>
        <div class="con">
          <div class="head">
            <span class="right-head1">排名</span>
            <span class="right-head2">用户名</span>
            <span class="right-head3">访问次数</span>
          </div>
          <div class="body">
            <div
              v-for="(item, index) in new Array(5)"
              :key="index"
              class="con-item"
            >
              <span class="right-body1">{{ index + 1 }}</span>
              <span class="right-body2">用户名</span>
              <span class="right-body3">6237</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="item">
      <div class="all">
        <div class="con" ref="line"></div>
      </div>
    </div>
    <div class="item">
      <div class="all">
        <div class="title">
          <i></i>
          <span>国家分布占比</span>
        </div>
        <div class="con" ref="pie"></div>
      </div>
    </div>
    <div class="item">
      <div class="all">
        <div class="title">
          <i></i>
          <span>年代分布</span>
        </div>
        <div class="con" ref="bar"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { bar_config, pie_config, line_config } from "./config";
export default {
  created() {},
  mounted() {
    const echarts = this.echarts;
    const { line, bar, pie } = this.$refs;
    echarts.init(line).setOption(line_config);
    echarts.init(bar).setOption(bar_config);
    echarts.init(pie).setOption(pie_config);
  }
};
</script>

<style lang="scss" scoped>
@import ".";
</style>
