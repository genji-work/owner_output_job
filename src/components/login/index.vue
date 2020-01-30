<template>
  <div class="login">
    <div class="login-form">
      <h3 class="title">{{ this.title }}</h3>
      <el-form
        :model="rule_form"
        status-icon
        :rules="rules"
        ref="rule_form"
        class="form-con"
      >
        <el-form-item prop="email">
          <el-input
            type="text"
            placeholder="请输入账号"
            v-model="rule_form.email"
            autocomplete="off"
            prefix-icon="el-icon-user"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="rule_form.password"
            autocomplete="off"
            prefix-icon="el-icon-lock"
          />
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked">记住我</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <Footer />
  </div>
</template>

<script>
import { loginService } from "../../services/api";
import Footer from "../footer";
export default {
  components: {
    Footer
  },
  created() {
    const { email = "", password = "" } = this.get_users();
    const q = decodeURIComponent(
      this._.get(this.$router, "history.current.query.q", "")
    );
    this.title = q;
    this.rule_form = {
      email,
      password
    };
    email &&
      password &&
      (() => {
        this.checked = true;
      })();
  },
  data() {
    const email_validate = (rule, value, callback) => {
      if (value) {
        const { password = "" } = this.get_users(value);
        password &&
          (() => {
            this.rule_form.password = password;
          })();
        callback();
      } else {
        callback(new Error("请输入用户名"));
      }
    };
    const password_validate = (rule, value, callback) => {
      value !== "" && callback();
      value === "" && callback(new Error("请输入密码"));
    };
    return {
      title: "",
      rule_form: {
        email: "",
        password: ""
      },
      rules: {
        email: [{ validator: email_validate, trigger: "blur" }],
        password: [{ validator: password_validate, trigger: "blur" }]
      },
      checked: false
    };
  },
  methods: {
    get_users(key = "") {
      const users = this.cookies.get("users")
        ? JSON.parse(this.cookies.get("users"))
        : [];
      if (key) {
        const user = users.filter(item => item.email === key);
        return user.length ? user[0] : {};
      }
      return users.length ? users[0] : {};
    },
    set_users(user = {}) {
      const users = this.cookies.get("users")
        ? JSON.parse(this.cookies.get("users"))
        : [];
      const { email = "", password = "" } = user;
      const target = users.filter(item => {
        item.email === email &&
          (() => {
            item.password = password;
          })();
        return item.email === email;
      });
      !target.length && users.push(user);
      this.cookies.set("users", JSON.stringify(users));
    },
    login() {
      this.$refs.rule_form.validate(async valid => {
        if (valid) {
          const { code, info = "" } = await loginService(this.rule_form);
          if (code === 0) {
            this.$message.success("登录成功");
            this.set_users({
              ...this.rule_form
            });
            this.$router.push(`/main?q=${encodeURIComponent(this.title)}`);
          } else {
            this.$message.error(info || "登陆失败，请联系管理员");
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
