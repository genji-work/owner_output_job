<template>
  <div :class="`header banner${idx}`">
    <ownerUpload v-model="upload_model" @close="close" />
    <div class="title-con">
      <div class="icon-con" @click="backHome">
        <i :class="`logo logo${idx}`" />
        <span>{{ title }}</span>
      </div>
      <div class="op-con">
        <div class="upload-box" @click="upload">
          <i class="el-icon-upload" />
          <span>我要上传</span>
        </div>
        <el-dropdown>
          <div class="op-box">
            <i class="user" />
            <span>{{ userdata.username || "未知" }}</span>
            <i class="el-icon-arrow-down"></i>
          </div>
          <el-dropdown-menu class="menu-list" slot="dropdown">
            <el-dropdown-item class="menu-item" @click.native="goCollect">
              <i />
              <span>我的收藏</span>
            </el-dropdown-item>
            <el-dropdown-item
              class="menu-item"
              @click.native="goUploads"
              divided
            >
              <i />
              <span>我的上传</span>
            </el-dropdown-item>
            <el-dropdown-item
              class="menu-item"
              @click.native="goBasicInfo"
              divided
            >
              <i />
              <span>个人中心</span>
            </el-dropdown-item>
            <el-dropdown-item class="menu-item" @click.native="logout" divided>
              <i />
              <span>退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { db_list } from "../../../router/intercept";
import {basicInfoService, logoutService} from "../../../services/api";
import ownerUpload from "./upload";
export default {
  components: {
    ownerUpload
  },
  async mounted() {
    const username = this.cookies.get("login_user_name") || "";
    const res = await basicInfoService({
      username
    });
    res.code === "200" && (this.userdata = res.data);
  },
  data() {
    const q = this._.get(this.$route, "query.q", "");
    return {
      title: q,
      userdata: {},
      upload_model: false,
      idx: this._.indexOf(db_list, q) + 1
    };
  },
  methods: {
    goBasicInfo() {
      const { commit } = this.$store;
      commit("auth/setUserData", this.userdata);
      this.$router.push(`/main/base_info?q=${this.title}`);
    },
    goUploads() {
      this.$router.push(`/main/uploads?q=${this.title}`);
    },
    goCollect() {
      this.$router.push(`/main/collects?q=${this.title}`);
    },
    upload() {
      this.upload_model = true;
    },
    close() {
      this.upload_model = false;
    },
    async logout() {
      const q = this._.get(this.$route, "query.q", "");
      const res = await logoutService();
      res &&
        this.$message.success("注销成功") &&
        this.$router.push(`/login?q=${q}`);
    },
    backHome() {
      const q = this._.get(this.$route, "query.q", "");
      this.$router.push(`/main?q=${q}`);
    }
  }
};
</script>

<style lang="scss" scoped>
@import ".";
</style>
