<template>
  <div class="base-info-con">
    <div class="title">
      <i></i>
      <span>基本信息</span>
    </div>
    <div class="con">
      <div class="item">
        <div class="label">用户名</div>
        <div class="item-con">{{ userdata.username }}</div>
      </div>
      <div class="item">
        <div class="label">邮箱</div>
        <div class="item-con">{{ userdata.email }}</div>
      </div>
      <div class="item">
        <div class="label">手机号</div>
        <div class="item-con"></div>
      </div>
      <div class="item">
        <div class="label">部门</div>
        <div class="item-con"></div>
      </div>
      <div class="item">
        <div class="label">职位</div>
        <div class="item-con"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { basicInfoService } from "../../../services/api";

export default {
  created() {
    this.init();
  },
  data() {
    return {
      userdata: {}
    };
  },
  methods: {
    async init() {
      const { getters } = this.$store;
      let userdata = getters["auth/userdata"];
      !this._.keys(userdata).length &&
        (userdata = await (async () => {
          const username = this.cookies.get("login_user_name") || "";
          const res = await basicInfoService({
            username
          });
          if (res.code === "200") {
            return res.data;
          }
          return {};
        })());
      this.userdata = userdata;
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
