#!/bin/bash

# ./scripts
basepath=$(dirname $0)

function check_result {
  if [ $? -ne 0 ]; then
    echo '组件构建失败';
    exit -1
  fi
}

# 删除 lib 文件夹
rm -rf $basepath/../lib -- !(index.js)
check_result

# 更新 webpack 配置文件
node $basepath/update-webpack-config.js
check_result

# 构建每个组件对应的 js 文件到 lib
webpack --config $basepath/../config/webpack.prod.js --progress
check_result
echo [build:components] DONE\!
