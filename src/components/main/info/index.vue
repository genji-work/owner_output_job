<template>
  <div class="info">
    <div class="title" @click="backHome">
      <i class="el-icon-arrow-left"></i>
      <span>首页</span>
    </div>
    <div class="con">
      <el-tabs class="menu" v-model="activeName">
        <el-tab-pane label="预览PDF" name="first">
          <div class="preview-con" v-loading="preview_loading">
            <img
              @load="imgLoad"
              :src="
                `/api/file/preview/${country}/${doc_id}/p${preview_index}.png`
              "
              alt=""
            />
          </div>
          <div class="preview-footer">
            <span class="preview-pagenum">P.{{ preview_index }}</span>
            <div class="preview-paganation">
              <el-button
                type="info"
                icon="el-icon-arrow-left"
                :disabled="preview_loading || preview_index === 1"
                @click="previewChange('left')"
                plain
              ></el-button>
              <el-input-number
                v-model="preview_index"
                :controls="false"
                :disabled="preview_loading"
                :min="1"
                @change="previewChange"
                :max="parseInt(total)"
              ></el-input-number>
              <el-button
                :disabled="preview_index === +total || preview_loading"
                type="info"
                icon="el-icon-arrow-right"
                @click="previewChange('right')"
                plain
              >
              </el-button>
              <span class="preview-pagenum-total">共 {{ total }} 页</span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="缩略图" name="second">
          <div class="dist-con">
            <div class="dist-item-box">
              <div
                class="dist-item"
                v-for="(item, index) in total
                  ? new Array(
                      dist_index < dist_all_page
                        ? 15
                        : total - (dist_index - 1) * 15
                    )
                  : []"
                :key="index"
              >
                <div class="img-box">
                  <img
                    :src="
                      `/api/file/preview/${country}/${doc_id}/thumb_p${index +
                        (dist_index - 1) * 15 +
                        1}.png`
                    "
                    alt=""
                  />
                </div>
                <div class="dist-pagenum">
                  P.{{ index + (dist_index - 1) * 15 + 1 }}
                </div>
              </div>
            </div>
            <div class="dist-paganation">
              <div class="preview-paganation">
                <el-button
                  type="info"
                  icon="el-icon-arrow-left"
                  :disabled="dist_index === 1"
                  @click="distChange('left')"
                  plain
                ></el-button>
                <el-input-number
                  v-model="dist_index"
                  :controls="false"
                  :min="1"
                  :max="Math.ceil(total / 15)"
                ></el-input-number>
                <el-button
                  :disabled="dist_index === Math.ceil(total / 15)"
                  type="info"
                  icon="el-icon-arrow-right"
                  @click="distChange('right')"
                  plain
                >
                </el-button>
                <span class="preview-pagenum-total">共 {{ total }} 页</span>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="文本内容" name="third">
          <div class="txt-con">
            <el-input
              v-loading="txt_loading"
              type="textarea"
              class="txt-area"
              autosize
              resize="none"
              v-model="txt_content"
              disabled
            />
          </div>
          <div class="preview-footer">
            <span class="preview-pagenum">P.{{ txt_index }}</span>
            <div class="preview-paganation">
              <el-button
                type="info"
                icon="el-icon-arrow-left"
                :disabled="txt_index === 1 || txt_loading"
                @click="txtChange('left')"
                plain
              ></el-button>
              <el-input-number
                :disabled="txt_loading"
                v-model="txt_index"
                :controls="false"
                :min="1"
                @change="txtChange"
                :max="parseInt(total)"
              ></el-input-number>
              <el-button
                :disabled="txt_index === +total || txt_loading"
                type="info"
                icon="el-icon-arrow-right"
                @click="txtChange('right')"
                plain
              >
              </el-button>
              <span class="preview-pagenum-total">共 {{ total }} 页</span>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { queryTxtService } from "../../../services/api";

export default {
  async created() {
    this.previewTxt();
  },
  methods: {
    initData() {
      // this.preview_index = 1;
      this.activeName = "first";
    },
    imgLoad(res) {
      if (res) {
        this.preview_loading = false;
      }
    },
    backHome() {
      const {
        query: { q = "" }
      } = this.$route;
      this.$router.push(`/main?q=${q}`);
    },
    async previewTxt() {
      const params = {
        id: this.doc_id,
        country: this.country,
        page: this.txt_index
      };
      this.txt_loading = true;
      const res = await queryTxtService(params);
      this.txt_loading = false;
      this.txt_content = res;
    },
    previewChange(type) {
      this.preview_loading = true;
      switch (type) {
        case "left":
          this.preview_index--;
          break;
        case "right":
          this.preview_index++;
          break;
      }
    },
    txtChange(type) {
      switch (type) {
        case "left":
          this.txt_index--;
          break;
        case "right":
          this.txt_index++;
          break;
      }
      this.previewTxt();
    },
    distChange(type) {
      switch (type) {
        case "left":
          this.dist_index--;
          break;
        case "right":
          this.dist_index++;
          break;
        default:
          break;
      }
    }
  },
  data() {
    const {
      query: { doc_id = "", total = 0, country = "", page }
    } = this.$route;
    let preview_index = 1;
    page &&
      (() => {
        preview_index = page;
      })();
    return {
      activeName: "first",
      preview_loading: true,
      txt_loading: true,
      doc_id,
      total,
      country,
      preview_index,
      dist_index: 1,
      txt_index: 1,
      txt_content: "",
      dist_all_page: Math.ceil(total / 15)
    };
  },
  watch: {
    $route() {
      const {
        query: { doc_id = "", total = 0, page }
      } = this.$route;
      page &&
        (() => {
          this.preview_index = page;
        })();
      this.doc_id = doc_id;
      this.total = +total;
      this.initData();
    }
  }
};
</script>

<style lang="scss" scoped>
@import ".";
</style>
