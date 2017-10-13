#!/bin/bash

# ./scripts
basepath=$(dirname $0)

function check_result {
  if [ $? -ne 0 ]; then
    echo 命令执行失败
    exit -1
  fi
}

node $basepath/update-jest-config.js
check_result

jest -c $basepath/../jest.config.json --runInBand "$@"
check_result