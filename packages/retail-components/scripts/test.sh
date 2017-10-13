#!/bin/bash

function check_result {
  if [ $? -ne 0 ]; then
    echo 命令执行失败
    exit -1
  fi
}

jest -c jest.config.json "$@"
check_result