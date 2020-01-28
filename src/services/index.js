import Axios from "axios";
import qs from "qs";
import { Loading, Message } from "element-ui";
import _ from "lodash";
import cookies from "js-cookie";
import { backLogin } from "../utils";

class AxiosUtil {
  static axios = null;
  static loading = null;
  static count = 0;
  static getInstance() {
    if (!this.axios) {
      this.axios = Axios;
      this.axios.timeout = 45000;
      this.axios.interceptors.request.use(
        config => {
          const email = cookies.get("email");
          const { url = "" } = config;
          if (email || url.indexOf("/login") > -1) {
            this.count === 0 &&
              (() => {
                this.loading = Loading.service({
                  fullscreen: true
                });
              })();
            this.count++;
            return config;
          }
          Message.error("登录状态已失效，请重新登录");
          backLogin();
          return Promise.reject(new Error("无权操作"));
        },
        error => {
          return Promise.reject(error);
        }
      );
      this.axios.interceptors.response.use(
        response => {
          this.count--;
          this.count === 0 &&
            this.loading &&
            this.loading.close() &&
            (() => {
              this.loading = null;
            })();
          return response;
        },
        error => {
          this.count--;
          this.count === 0 &&
            this.loading &&
            this.loading.close() &&
            (() => {
              this.loading = null;
            })();
          const status = _.get(error, "response.status", "");
          status === 403 && Message.error("没有权限操作，请联系管理员");
          status === 401 &&
            Message.error("登录状态已失效，请重新登录") &&
            backLogin();
          return Promise.reject(error);
        }
      );
    }
    return this.axios;
  }
}

export default class BaseService {
  http = null;
  constructor() {
    this.http = AxiosUtil.getInstance();
  }

  async get(str = "", data = {}) {
    const res = await this.http.get(str, {
      params: data
    });
    if (res.status === 200 && res.data) {
      return res.data;
    } else {
      return (
        res.data || {
          status: 1,
          msg: "请求失败"
        }
      );
    }
  }
  async delete(str = "", data = {}) {
    const res = await this.http.delete(str, {
      params: data
    });
    if (res.status === 200 && res.data) {
      return res.data;
    } else {
      return (
        res.data || {
          status: 1,
          msg: "请求失败"
        }
      );
    }
  }
  async post(str = "", data = {}, type = "") {
    let params = "";
    type === "formdata" &&
      (() => {
        params = qs.stringify(data);
      })();
    const res = await this.http.post(str, params || data);
    if (res.status === 200 && res.data) {
      return res.data;
    } else {
      return (
        res.data || {
          status: 1,
          msg: "请求失败"
        }
      );
    }
  }
  async put(str = "", data = {}) {
    const res = await this.http.put(str, data);
    if (res.status === 200 && res.data) {
      return res.data;
    } else {
      return (
        res.data || {
          status: 1,
          msg: "请求失败"
        }
      );
    }
  }
}
