<template>
  <div class="menu">
    <div class="title">
      <i class="filter"></i>
      <span>筛选</span>
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
            {{ item.label }} ({{ item.count }})
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
        <ul class="con">
          <li>
            全部(100)
          </li>
          <li v-for="(item, index) in country" :key="index">{{ item }} (20)</li>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { docYearService } from "../../../../services/api";
import { category_map } from "../../../../router/intercept";
export default {
  created() {
    this.selectedChange();
    // const res2 = await docCountryService(params);
    // eslint-disable-next-line no-console
    // console.log(res_year, res2);
  },
  data() {
    const date_list = [];
    const date_count = 0;
    const country = [
      "联合国相关组织和机构",
      "联合国相关组织和机构",
      "联合国相关组织和机构",
      "联合国相关组织和机构",
      "联合国相关组织和机构",
      "联合国相关组织和机构",
      "联合国相关组织和机构",
      "联合国相关组织和机构",
      "联合国相关组织和机构",
      "联合国相关组织和机构",
      "联合国相关组织和机构",
      "联合国相关组织和机构",
      "联合国相关组织和机构",
      "联合国相关组织和机构",
      "联合国相关组织和机构",
      "联合国相关组织和机构"
    ];
    return {
      date_list,
      country,
      date_count,
      selectedYear: "",
      activeNames: ["1", "2"]
    };
  },
  methods: {
    chooseYear(year) {
      const {
        path,
        query: { q = "", filter = "" }
      } = this.$route;
      const filter_zip = decodeURIComponent(filter) || {};
      let query = {};
      if (filter_zip) {
        query = JSON.parse(filter_zip);
      }
      query = {
        ...query,
        year
      };
      this.$router.push(
        `${path}?q=${q}&filter=${encodeURIComponent(JSON.stringify(query))}`
      );
    },
    async selectedChange() {
      const {
        query: { q = "", filter = "" }
      } = this.$route;
      const filter_zip = decodeURIComponent(filter) || {};
      const params = {
        category: category_map[q] || ""
      };
      if (filter_zip) {
        const { keyword = "", year = "" } = JSON.parse(filter_zip);
        params.keyword = keyword;
        this.selectedYear = year;
      }

      const res_year = await docYearService(params);
      if (res_year.code === "200") {
        this.date_count = 0;
        const { data } = res_year;
        const date_list = [];
        Object.keys(data).map(key => {
          date_list.push({
            label: key,
            count: data[key]
          });
          this.date_count += data[key];
        });
        this.date_list = date_list;
      }
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
