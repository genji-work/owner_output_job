<template>
  <div class="result">
    <div class="res-list">
      <div class="order-con">
        <div class="year-order" @click="changeOrder('year')">
          <span>按年份排序</span>
          <i
            :class="
              `${order === 'year_desc' ? 'desc' : ''} ${
                order === 'year_asc' ? 'asc' : ''
              }`
            "
          ></i>
        </div>
        <div class="country-order" @click="changeOrder('country')">
          <span>按国家排序</span>
          <i
            :class="
              `${order === 'country_desc' ? 'desc' : ''} ${
                order === 'country_asc' ? 'asc' : ''
              }`
            "
          ></i>
        </div>
        <div class="country-order" @click="changeOrder('page')">
          <span>按页数排序</span>
          <i
            :class="
              `${order === 'page_desc' ? 'desc' : ''} ${
                order === 'page_asc' ? 'asc' : ''
              }`
            "
          ></i>
        </div>
      </div>
      <div class="pdf-item" v-for="item in data" :key="item.id">
        <div class="pdf-left">
          <div class="pdf-left-img-box">
            <span v-if="!item.id">暂无图片</span>
            <img
              :src="`/api/file/preview/${item.country}/${item.id}/thumb_p1.png`"
              alt=""
            />
          </div>
        </div>
        <div class="pdf-right">
          <div class="pdf-title" v-html="item.title"></div>
          <div class="pdf-description">
            <div class="country-con">
              <span>国家:</span>
              <span>{{ cityMap[item.country] }}</span>
            </div>
            <div class="year-con">
              <span>年份:</span>
              <span>{{ item.year }}</span>
            </div>
            <div class="op-con">
              <i class="el-icon-view preview" @click="goPreview(item)"></i>
              <i class="el-icon-star-off" @click="collect(item)"></i>
              <i
                class="el-icon-download download"
                @click="downloadPdf(item)"
              ></i>
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
            <div class="all-page" @click="dropResult('info', item)">
              <span
                >共<em>{{ item.documentTotalPage || 0 }}</em
                >页</span
              >
              <i
                :class="
                  item.showInfo ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
                "
              ></i>
            </div>
            <div class="page-op">
              <span v-show="!keyword">在新标签页中查看所有页面</span>
              <span v-show="keyword" @click="dropResult('result', item)"
                >查看提及<em>"</em><em class="keyword">{{ keyword }}</em
                ><em>"</em>的全部{{ item.pages.length }}个页面</span
              >
            </div>
          </div>
          <div class="page-info-con" v-show="item.showInfo">
            <div
              class="page-info-item"
              v-for="(child, idx) in item.documentTotalPage > 8
                ? new Array(8)
                : new Array(item.documentTotalPage)"
              :key="idx"
            >
              <div class="page-info-item-con">
                <img
                  :src="
                    `/api/file/preview/${item.country}/${item.id}/thumb_p${idx +
                      1}.png`
                  "
                  alt=""
                />
              </div>
              <div class="page-info-num">P.{{ idx + 1 }}</div>
            </div>
          </div>
          <div class="page-result-con" v-show="item.showResult">
            <div
              class="page-result-item"
              v-for="(child, index) in item.pages"
              :key="index"
            >
              <div class="page-result-con-left">
                <div class="page-result-img">
                  <img
                    :src="
                      `/api/file/preview/${item.country}/${item.id}/thumb_p${child.page}.png`
                    "
                    alt=""
                  />
                </div>
                <div class="page-result-num">P.{{ child.page }}</div>
              </div>
              <div class="page-result-con-text" v-html="child.text"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pagnation">
      <el-pagination
        background
        :current-page="currentPage"
        layout="prev, pager, next"
        :total="total"
        :page-size="10"
        @current-change="changePage"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  collectService,
  downloadService,
  searchPdfService
} from "../../../../services/api";
import { category_map } from "../../../../router/intercept";
import { changeFilterGo, orderFormart } from "../../../../utils";
import { getFilter } from "../../../../utils";
export default {
  async created() {
    this.search();
  },
  methods: {
    async search() {
      const {
        query: { q }
      } = this.$route;
      const filter = getFilter() || {};
      const params = {
        ...filter,
        category: category_map[q]
      };
      const { keyword = "", currentPage = 1, order = "" } = filter;
      this.keyword = keyword;
      this.currentPage = currentPage;
      const res = await searchPdfService({
        ...params,
        ...orderFormart(order)
      });
      const {
        code,
        data: { data = [], total = 0 }
      } = res;
      if (code === "200") {
        this.data =
          data.map(item => {
            item.showInfo = false;
            item.showResult = false;
            return item;
          }) || [];
      }
      this.total = total;
    },
    dropResult(type, item) {
      switch (type) {
        case "result":
          item.showInfo = false;
          item.showResult = !item.showResult;
          break;
        case "info":
          item.showResult = false;
          item.showInfo = !item.showInfo;
          break;
      }
    },
    changeOrder(type) {
      switch (type) {
        case "year":
          if (this.order === "year_asc") {
            this.order = "year_desc";
          } else if (this.order === "year_desc") {
            this.order = "";
          } else {
            this.order = "year_asc";
          }
          break;
        case "country":
          if (this.order === "country_asc") {
            this.order = "country_desc";
          } else if (this.order === "country_desc") {
            this.order = "";
          } else {
            this.order = "country_asc";
          }
          break;
        case "page":
          if (this.order === "page_asc") {
            this.order = "page_desc";
          } else if (this.order === "page_desc") {
            this.order = "";
          } else {
            this.order = "page_asc";
          }
          break;
      }
      const newPath = changeFilterGo({
        order: this.order
      });
      this.$router.push(newPath);
    },
    changePage(page) {
      const newPath = changeFilterGo({
        currentPage: page
      });
      this.$router.push(newPath);
      this.$("#result_main").animate({ scrollTop: 0 });
    },
    goPreview(item) {
      const { id, documentTotalPage, country, fileType } = item;
      const {
        query: { q = "" }
      } = this.$route;
      this.$router.push(
        `/main/info?q=${q}&doc_id=${id}&total=${documentTotalPage}&country=${country}&file_type=${fileType}`
      );
    },
    async collect(item) {
      const res = await collectService({
        documentId: item.id
      });
      res.code === "200" && this.$message.success("收藏成功");
      res.code !== "200" && this.$message.error(res.message || "收藏失败");
    },
    downloadPdf(item) {
      const { id, fileName, country } = item;
      downloadService({
        documentId: id,
        fileName,
        country
      });
    }
  },
  data() {
    const { cityMap } = this._.get(this, "$store.state.dic", {});
    return {
      data: [],
      keyword: "",
      order: "",
      currentPage: 1,
      total: 0,
      cityMap
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
