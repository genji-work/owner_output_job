<template>
  <el-dialog
    :visible="value"
    :show-close="false"
    append-to-body
    class="upload-con"
    center
  >
    <div class="title" slot="title">
      <span>上传文件</span>
    </div>
    <div class="con">
      <el-form :model="form" ref="upload_form" :rules="rules">
        <el-form-item label="文件：" prop="fileId">
          <el-upload
            v-show="!form.fileId && !loading"
            :show-file-list="false"
            drag
            :on-success="upload"
            :before-upload="checkFile"
            action="/api/file/uploadFile.json"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip">
              支持 doc, docx, xls, PDF, rar, zip, PNG, JPG 等类型的文件
            </div>
          </el-upload>
          <div v-show="loading" class="loading-box">
            <i class="el-icon-loading"></i>
            <span>上传文件中</span>
          </div>
          <div v-show="!loading && form.fileId" class="file-box">
            <div class="file">
              <i class="el-icon-error" @click="deleteFile"></i>
              <i class="el-icon-document"></i>
              <el-tooltip :content="file && file.name">
                <span>{{ file && file.name }}</span>
              </el-tooltip>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="标题：" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="国家：" prop="country">
          <el-select v-model="form.country" placeholder="请选择国家">
            <el-option
              v-for="item in countryList"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="语言：" prop="language">
          <el-select v-model="form.language" placeholder="请选择语言">
            <el-option
              v-for="item in languages"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="年份：" prop="year">
          <el-date-picker
            v-model="form.year"
            type="year"
            placeholder="选择年份"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="描述：" prop="description">
          <el-input
            type="textarea"
            v-model="form.description"
            placeholder="请输入描述"
            resize="none"
            :rows="2"
          />
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
import { getPrefix } from "../../../../utils";
import moment from "moment";
import { saveDocService } from "../../../../services/api";
import { category_map } from "../../../../router/intercept";

const TYPE_LIST = ["doc", "docx", "pdf", "rar", "zip", "png", "jpg"];

export default {
  props: {
    value: {
      type: Boolean
    }
  },
  methods: {
    upload(res = {}, file) {
      if (res.code === "200") {
        setTimeout(() => {
          this.form.fileId = res.data;
          this.file = file.raw;
          this.loading = false;
        }, 500);
      } else {
        this.$message.error(res.message || "上传失败");
      }
    },
    deleteFile() {
      this.file = null;
      this.form.fileId = "";
    },
    checkFile(file) {
      const type = getPrefix(file.name);
      if (TYPE_LIST.includes(type)) {
        this.loading = true;
        return true;
      }
      this.$message.error("文件格式不对，请重新选择文件");
      return false;
    },
    save() {
      this.$refs.upload_form.validate(async valid => {
        if (valid) {
          const { year } = this.form;
          const params = this._.cloneDeep(this.form);
          params.year = moment(year).format("YYYY");
          const res = await saveDocService(params);
          if (res.code === "200") {
            this.$message.success("上传成功");
            this.$emit("close");
          } else {
            this.$message.error(res.message || "上传失败");
          }
        }
      });
    }
  },
  data() {
    const q = this._.get(this.$route, "query.q", "");
    const rules = {
      fileId: [{ required: true, message: "请上传文件", trigger: "change" }],
      title: [{ required: true, message: "请输入名称", trigger: "blur" }],
      country: [{ required: true, message: "请选择国家", trigger: "change" }],
      year: [{ required: true, message: "请选择年份", trigger: "change" }],
      language: [{ required: true, message: "请选择语言", trigger: "change" }]
    };
    const form = {
      fileId: "",
      description: "",
      title: "",
      country: "",
      year: "",
      language: "",
      category: category_map[q]
    };
    return {
      countryList: [],
      languages: [],
      form,
      file: null,
      loading: false,
      percent: 0,
      rules
    };
  },
  watch: {
    value(val) {
      if (val) {
        const { countryList, languages } = this._.get(
          this,
          "$store.state.dic",
          {}
        );
        this.countryList = countryList;
        this.languages = languages;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import ".";
</style>
