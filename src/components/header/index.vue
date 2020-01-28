<template>
  <div :class="`header banner${idx}`">
    <div class="title-con">
      <div class="icon-con">
        <i :class="`logo logo${idx}`" />
        <span>{{ title }}</span>
      </div>
      <div class="op-con">
        <div class="upload-box">
          <i class="el-icon-upload" />
          <span>我要上传</span>
        </div>
        <el-dropdown>
          <div class="op-box">
            <i class="user" />
            <span>Admin</span>
            <i class="el-icon-arrow-down"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <i />
              <span>我的收藏</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <i />
              <span>我的上传</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <i />
              <span>个人中心</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
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
import { db_list } from "../../router/intercept";
export default {
  data() {
    const q = this._.get(this.$route, "query.q", "");
    return {
      title: q,
      idx: this._.indexOf(db_list, q) + 1
    };
  }
};
</script>

<style lang="scss" scoped>
@import ".";
</style>
