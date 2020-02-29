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
              <span
                class="left-body2"
                :title="
                  keywordHotList[index] ? keywordHotList[index].keyword : ''
                "
                >{{
                  keywordHotList[index] ? keywordHotList[index].keyword : ""
                }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="half">
        <div class="title">
          <i class="el-icon-s-data"></i>
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
              <span class="right-body2">{{
                userHotList[index] ? userHotList[index].userName : ""
              }}</span>
              <span class="right-body3">{{
                userHotList[index] ? userHotList[index].total : ""
              }}</span>
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
import { bar_config, pie_config, line_config, WeekMap } from "./config";
import {
  queryUserHotService,
  queryKeywordHotService,
  ipPvService,
  visitService,
  // docCountryService,
  docYearService,
  docCountryService
} from "../../../../services/api";
import { category_map } from "../../../../router/intercept";
export default {
  async created() {
    await visitService();
    this.init();
  },
  data() {
    return {
      userHotList: [],
      keywordHotList: []
    };
  },
  async mounted() {},
  methods: {
    async init() {
      this.init_line();
      this.init_bar();
      this.init_pie();
      const res_user = await queryUserHotService();
      res_user.code === "200" &&
        res_user.data &&
        (this.userHotList = res_user.data || []);
      const res_keyword = await queryKeywordHotService();
      res_keyword.code === "200" &&
        res_keyword.data &&
        (this.keywordHotList = res_keyword.data || []);
    },
    async init_line() {
      const echarts = this.echarts;
      const { line } = this.$refs;
      const ip_res = await ipPvService();
      const line_res = [
        {
          name: "IP",
          type: "line",
          stack: "总量",
          areaStyle: {
            color: "#ff305591"
          },
          lineStyle: {
            color: "#FF3055"
          },
          data: []
        },
        {
          name: "PV",
          type: "line",
          stack: "总量",
          areaStyle: {
            color: "#53a8e282"
          },
          lineStyle: {
            color: "#53A8E2"
          },
          data: []
        }
      ];
      const line_xaixs = [];
      if (ip_res.code === "200") {
        const { data = [] } = ip_res;
        data.map(item => {
          line_xaixs.push(WeekMap[item.weekDay]);
          line_res[1].data.push(item.pvTotal);
          line_res[0].data.push(item.ipTotal);
        });
      }
      line_config.series = line_res;
      line_config.xAxis[0].data = line_xaixs;
      echarts.init(line).setOption(line_config);
    },
    async init_bar() {
      const {
        query: { q = "" }
      } = this.$route;
      const { bar } = this.$refs;
      const echarts = this.echarts;
      const xAisx = [];
      const data_bar = [];
      const res = await docYearService({
        category: category_map[q] || ""
      });
      if (res.code === "200") {
        const { data } = res;
        this._.keys(data).map(item => {
          xAisx.push(item);
          data_bar.push(data[item]);
        });
        bar_config.xAxis.data = xAisx;
        bar_config.series[0].data = data_bar;
      }
      echarts.init(bar).setOption(bar_config);
    },
    async init_pie() {
      const { pie } = this.$refs;
      const echarts = this.echarts;
      const { cityMap = {} } = this._.get(this, "$store.state.dic", {});
      const xAisx = [];
      const pie_data = [];
      const {
        query: { q = "" }
      } = this.$route;
      const res = await docCountryService({
        category: category_map[q] || ""
      });
      if (res.code === "200") {
        const { data = {} } = res;
        this._.keys(data).map(item => {
          this._.keys(data[item]).length &&
            this._.keys(data[item]).map(key => {
              xAisx.push(cityMap[key]);
              pie_data.push({
                name: cityMap[key],
                value: data[item][key]
              });
            });
        });
        pie_config.legend.data = xAisx;
        pie_config.series[0].data = pie_data;
      }
      echarts.init(pie).setOption(pie_config);
    }
  },
  watch: {
    $route() {
      this.init();
    }
  }
};
</script>

<style lang="scss" scoped>
@import ".";
</style>
