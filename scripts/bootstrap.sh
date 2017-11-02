#!/bin/bash

lerna clean --yes

cd packages/retail-components && npm install  && npm run build