<template>
  <div class="base-info-con">
    <update-password
      v-if="update_model"
      v-model="update_model"
      @close="close"
    />
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
      <div class="item">
        <div class="label">安全设置</div>
        <div class="item-con">
          <span class="link-span" @click="updatePassword">修改密码</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { basicInfoService } from "../../../services/api";
import UpdatePassword from "./updatePassword";

export default {
  components: {
    "update-password": UpdatePassword
  },
  created() {
    this.init();
  },
  data() {
    return {
      userdata: {},
      update_model: false
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
    },
    updatePassword() {
      this.update_model = true;
    },
    close() {
      this.update_model = false;
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
