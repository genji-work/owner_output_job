<template>
  <div class="uploads-con">
    <div class="title">
      <i></i>
      <span>我的上传</span>
    </div>
    <div class="con">
      <el-table
        header-row-class-name="upload-table-head"
        row-class-name="upload-table-row"
        show-overflow-tooltip
        :data="data"
      >
        <el-table-column label="名称">
          <template slot-scope="$scopedSlots">
            <el-tooltip :content="$scopedSlots.row.title" placement="top">
              <span class="table-title">{{ $scopedSlots.row.title }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          label="文档类型"
          width="100"
          prop="fileType"
        ></el-table-column>
        <el-table-column label="审核状态" width="100">
          <template slot-scope="$scopedSlots">
            <span class="table-title">{{
              documentApprovalStatusMap[$scopedSlots.row.documentApprovalStatus]
            }}</span>
            <el-tooltip
              v-show="$scopedSlots.row.documentApprovalStatus === 3"
              :content="$scopedSlots.row.approvalComments"
              placement="top"
            >
              <i class="el-icon-question"></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="年份" width="100" prop="year"></el-table-column>

        <el-table-column
          label="国家"
          width="120"
          prop="countryName"
        ></el-table-column>
        <el-table-column
          width="100"
          label="页数"
          prop="documentTotalPage"
        ></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="$scopedSlots">
            <div class="op-box">
              <el-tooltip content="预览" placement="top">
                <i class="el-icon-view" @click="preview($scopedSlots.row)"></i>
              </el-tooltip>
              <el-tooltip content="下载" placement="top">
                <i
                  class="el-icon-download"
                  @click="download($scopedSlots.row)"
                ></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <span
        >总数：<em>{{ total }} </em></span
      >
      <el-pagination
        background
        :current-page="params.currentPage"
        layout="prev, pager, next"
        :total="total"
        :page-size="params.pageSize"
        @current-change="changePage"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { uploadListService } from "../../../services/api";
import { documentApprovalStatusMap, viewGo } from "../../../utils";

export default {
  created() {
    this.init();
  },
  data() {
    const defaultParams = {
      currentPage: 1,
      pageSize: 10
    };
    return {
      data: [],
      params: defaultParams,
      total: 0,
      documentApprovalStatusMap
    };
  },
  methods: {
    async init() {
      const res = await uploadListService(this.params);
      res.code === "200" &&
        res.data &&
        res.data.data &&
        (() => {
          this.data = res.data.data || [];
          this.total = res.data.total;
        })();
    },
    preview(data) {
      const { id, documentTotalPage, country, fileType } = data;
      const {
        query: { q = "" }
      } = this.$route;
      this.$router.push(
        `/main/info?q=${q}&doc_id=${id}&total=${documentTotalPage}&country=${country}&file_type=${fileType}`
      );
    },
    changePage(page) {
      this.params.currentPage = page;
      this.init();
    },
    download(data) {
      const { downloadUrl = "" } = data;
      downloadUrl && viewGo(downloadUrl);
    }
  }
};
</script>

<style lang="scss" scoped>
@import ".";
</style>
