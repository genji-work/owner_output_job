<template>
  <div class="menu">
    <div class="title" @click="backHome">
      <i v-if="activeType === 'home'" class="filter"></i>
      <span v-if="activeType === 'home'">筛选</span>
      <i v-if="activeType === 'result'" class="el-icon-arrow-left"></i>
      <span v-if="activeType === 'result'">首页菜单 / 筛选</span>
    </div>
    <el-collapse class="filter-con" v-model="activeNames">
      <el-collapse-item name="1" class="filter-item">
        <template slot="title">
          <div class="filter-title">
            <i />
            <span>年份</span>
          </div>
        </template>
        <ul class="con year">
          <li :class="`${!selectedYear && 'active'}`" @click="chooseYear('')">
            全部({{ date_count }})
          </li>
          <li
            v-for="(item, index) in date_list"
            :key="index"
            :class="`${item.label === selectedYear && 'active'}`"
            @click="chooseYear(item.label)"
          >
            <span>{{ item.label }} ({{ item.count }})</span>
          </li>
        </ul>
      </el-collapse-item>
      <el-collapse-item name="2" class="filter-item">
        <template slot="title">
          <div class="filter-title">
            <i />
            <span>分类</span>
          </div>
        </template>
        <ul class="con country">
          <li
            :class="`${!selectedCountry && 'active'}`"
            @click="chooseCountry('')"
          >
            全部({{ country_count }})
          </li>
          <li
            v-for="(item, index) in country_list"
            :key="index"
            @click="item.showChildren = !item.showChildren"
          >
            <span>{{ item.label }} ({{ item.count }})</span>
            <ul class="children-con" v-show="item.showChildren">
              <li
                v-for="(child, idx) in item.children"
                :key="idx"
                :class="`${child.key === selectedCountry && 'active'}`"
                @click="chooseCountry(child.key)"
              >
                {{ child.label }} ({{ child.count }})
              </li>
            </ul>
          </li>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { docYearService, docCountryService } from "../../../../services/api";
import { category_map } from "../../../../router/intercept";
import { changeFilterGo, getFilter } from "../../../../utils";
export default {
  created() {},
  mounted() {
    this.selectedChange();
  },
  data() {
    const date_list = [];
    const date_count = 0;
    const country_count = 0;
    const country_list = [];
    return {
      date_list,
      country_list,
      date_count,
      country_count,
      selectedYear: "",
      selectedCountry: "",
      activeNames: ["1", "2"],
      activeType: "home"
    };
  },
  methods: {
    chooseYear(year) {
      const newPath = changeFilterGo({
        year,
        currentPage: 1
      });
      this.$router.push(newPath);
    },
    chooseCountry(country) {
      const newPath = changeFilterGo({
        country,
        currentPage: 1
      });
      this.$router.push(newPath);
    },
    async selectedChange() {
      const {
        query: { q = "" }
      } = this.$route;
      const filter = getFilter() || {};
      if (getFilter()) {
        this.activeType = "result";
      }
      const { year = "", country = "" } = filter;
      this.selectedYear = year;
      this.selectedCountry = country;

      const res_year = await docYearService({
        category: category_map[q] || "",
        ...filter,
        year: "",
        country: ""
      });

      if (res_year.code === "200") {
        this.date_count = 0;
        const { data } = res_year;
        this.formartYear(data);
      }
      const res_country = await docCountryService({
        category: category_map[q] || "",
        ...filter,
        year: "",
        country: ""
      });
      if (res_country.code === "200") {
        this.country_count = 0;
        const { data } = res_country;
        this.formartCountry(data);
      }
    },
    formartYear(data) {
      const date_list = [];
      Object.keys(data).map(key => {
        date_list.push({
          label: key,
          count: data[key]
        });
        this.date_count += data[key];
      });
      this.date_list = this._.orderBy(date_list, "label", "desc");
    },
    formartCountry(data) {
      const { countryMap = {}, cityMap = {} } = this._.get(
        this,
        "$store.state.dic",
        {}
      );
      const country_list = [];
      Object.keys(data).map(key => {
        const item = {
          key,
          label: countryMap[key] || "未知",
          count: 0,
          showChildren: true,
          children: []
        };
        typeof data[key] === "object" &&
          Object.keys(data[key]).map(k => {
            const city = {
              key: k,
              label: cityMap[k] || "未知",
              count: data[key][k]
            };
            item.count += data[key][k] || 0;
            item.children.push(city);
          });
        this.country_count += item.count || 0;
        country_list.push(item);
      });
      this.country_list = country_list;
    },
    backHome() {
      const {
        path,
        query: { q = "" }
      } = this.$route;
      this.$router.push(`${path}?q=${q}`);
    }
  },
  watch: {
    $route: "selectedChange"
  }
};
</script>

<style lang="scss" scoped>
@import ".";
</style>
