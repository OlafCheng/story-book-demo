#!/bin/bash

# ./scripts
basepath=$(dirname $0)

function check_result {
  if [ $? -ne 0 ]; then
    echo '命令执行失败';
    exit -1
  fi
}

# 删除 lib 文件夹
rm -rf ../lib
check_result

# 更新 webpack 配置文件
node update-webpack-config.js
check_result

# 构建每个组件对应的 js 文件到 lib
webpack --config ../config/webpack.prod.js --progress
check_result
echo [build:components] DONE\!
