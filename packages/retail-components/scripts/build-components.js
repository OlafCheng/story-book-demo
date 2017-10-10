/**
 * 编译 JavaScript 到对应的 lib 目录
 */
const fs = require('fs-extra');
const path = require('path');
const compiler;
const libDir = path.resolve(__dirname, '../lib');
const srcDir = path.resolve(__dirname, '../src');

// 清空 lib 目录
fs.emptyDirSync(libDir);

