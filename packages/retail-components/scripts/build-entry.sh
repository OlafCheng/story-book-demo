#!/bin/bash

#./scripts
basepath=$(dirname $0)

function check_result {
  if [ $? -ne 0 ]; then
    echo '入口文件构建失败';
    exit -1
  fi
}

# 删除旧的 lib/index.js
rm -rf $path/../lib/index.js
check_result

# 构建入口文件
webpack --config $basepath/../config/webpack.entry.js --progress
check_result

echo [build:entry] DONE\!
