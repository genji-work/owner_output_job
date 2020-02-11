<template>
  <div class="info">
    <div class="title" @click="backHome">
      <i class="el-icon-arrow-left"></i>
      <span>首页</span>
    </div>
    <div class="con">
      <el-tabs class="menu" v-model="activeName">
        <el-tab-pane label="预览PDF" name="first">
          <div class="preview-con">
            <img
              :src="
                `/v1/docdive/documents/${doc_id}/thumb_p${preview_index}.png`
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
                :disabled="preview_index === 1"
                @click="previewChange('left')"
                plain
              ></el-button>
              <el-input-number
                v-model="preview_index"
                :controls="false"
                :min="1"
                :max="parseInt(total)"
              ></el-input-number>
              <el-button
                :disabled="preview_index === +total"
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
                      `/v1/docdive/documents/${doc_id}/thumb_p${index +
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
        <el-tab-pane label="文本内容" name="third"> </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  created() {},
  methods: {
    initData() {
      this.preview_index = 1;
      this.activeName = "first";
    },
    backHome() {
      const {
        query: { q = "" }
      } = this.$route;
      this.$router.push(`/main?q=${q}`);
    },
    handleClick() {},
    previewChange(type) {
      switch (type) {
        case "left":
          this.preview_index--;
          break;
        case "right":
          this.preview_index++;
          break;
      }
    },
    distChange(type) {
      switch (type) {
        case "left":
          this.dist_index--;
          break;
        case "right":
          this.dist_index++;
          break;
      }
    }
  },
  data() {
    const {
      query: { doc_id = "", total = 0 }
    } = this.$route;
    return {
      activeName: "first",
      doc_id,
      total,
      preview_index: 1,
      dist_index: 1,
      dist_all_page: Math.ceil(total / 15)
    };
  },
  watch: {
    $route() {
      const {
        query: { doc_id = "", total = 0 }
      } = this.$route;
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
