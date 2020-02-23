<template>
  <el-dialog
    :visible="value"
    :show-close="false"
    append-to-body
    class="update-password"
    center
  >
    <div class="title" slot="title">
      <span>修改密码</span>
    </div>
    <div class="con">
      <el-form :model="form" ref="update_form" :rules="rules">
        <el-form-item label="旧密码：" prop="old_password">
          <el-input
            v-model="form.old_password"
            type="password"
            show-password
            placeholder="请输入旧密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="new_password">
          <el-input
            v-model="form.new_password"
            type="password"
            show-password
            placeholder="请输入新密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="再次输入：" prop="confirm_password">
          <el-input
            v-model="form.confirm_password"
            type="password"
            show-password
            placeholder="请再次输入"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer" slot="footer">
      <el-button @click="$emit('close')">取消</el-button>
      <el-button @click="save()">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { updatePasswordService } from "../../../../services/api";

export default {
  props: {
    value: {
      type: Boolean
    }
  },
  data() {
    const checkPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.new_password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    const rules = {
      old_password: [
        { required: true, message: "请输入旧密码", trigger: "blur" }
      ],
      new_password: [
        { required: true, message: "请输入新密码", trigger: "blur" }
      ],
      confirm_password: [
        { required: true, message: "请再次输入", trigger: "blur" },
        { validator: checkPassword, trigger: "blur" }
      ]
    };
    const form = {
      old_password: "",
      new_password: "",
      confirm_password: ""
    };
    return {
      rules,
      form
    };
  },
  methods: {
    save() {
      this.$refs.update_form.validate(async valid => {
        if (valid) {
          const username = this.cookies.get("userName");
          const {
            new_password: password,
            old_password: oldPassword
          } = this.form;
          const res = await updatePasswordService({
            username,
            password,
            oldPassword
          });
          const { code = "", message = "" } = res || {};
          code === "200" &&
            this.$message.success("修改成功") &&
            this.$emit("close");
          code !== "200" && this.$message.error(message || "修改失败");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import ".";
</style>
