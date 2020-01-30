<template>
  <div class="result">
    <div class="res-list">
      <div class="pdf-item" v-for="item in data" :key="item.id">
        <div class="pdf-left">
          <div class="pdf-left-img-box">
            <span v-if="!item.id">暂无图片</span>
            <img
              :src="`/v1/docdive/documents/${item.id}/thumb_p1.png`"
              alt=""
            />
          </div>
        </div>
        <div class="pdf-right">
          <div class="pdf-title" v-html="item.title"></div>
          <div class="pdf-description">
            <div class="country-con">
              <span>国家:</span>
              <span>{{ item.country }}</span>
            </div>
            <div class="year-con">
              <span>年份:</span>
              <span>{{ item.year }}</span>
            </div>
            <div class="op-con">
              <i class="preview"></i>
              <i class="download"></i>
            </div>
          </div>
          <div class="pdf-infomation">
            <div class="uploader-con">
              <span>上传者:</span>
              <span>{{ item.userName || "暂无" }}</span>
            </div>
            <div class="upload-date">
              <span>上传时间：</span>
              <span>{{ item.gmtCreate }}</span>
            </div>
          </div>
          <div class="pdf-op">
            <div class="all-page">
              <span
                >共<em>{{ item.documentTotalPage || 0 }}</em
                >页</span
              >
              <i class="el-icon-caret-top"></i>
            </div>
            <div class="page-op">
              <span>在新标签页中查看所有页面</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pagnation"></div>
  </div>
</template>

<script>
import { searchPdfService } from "../../../../services/api";
import { category_map } from "../../../../router/intercept";
export default {
  async created() {
    this.search();
  },
  methods: {
    async search() {
      const {
        query: { q, filter }
      } = this.$route;
      const filter_res = JSON.parse(decodeURIComponent(filter));
      const params = {
        ...filter_res,
        category: category_map[q]
      };
      const res = await searchPdfService(params);
      const {
        code,
        data: { data = [] }
      } = res;
      if (code === "200") {
        this.data = data || [];
      }
    }
  },
  data() {
    return {
      data: []
    };
  },
  watch: {
    $route: "search"
  }
};
</script>

<style lang="scss" scoped>
@import ".";
</style>
