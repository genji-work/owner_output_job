### 项目依赖安装
#### 环境依赖

    * node ( version > 8.0.0)
    * chrome

#### 依赖安装

``` shell
npm i -g @vue/cli
npm i
# 或者
yarn
```

### 项目运行
``` shell
npm run serve
# 或者
yarn serve
```

### 打包部署
``` shell
npm run build
# 或者
yarn build
# 将dist文件内的文件部署到nginx即可
```

#### 注意事项：
``` shell
# node-sass 会下载超时解决方式
npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/
# 设置全局镜像即可
```

### vue-cli ui界面配置
``` shell
# 进入项目目录
vue ui
# 打开localhost:8000
# 选择导入该文件夹即可
```