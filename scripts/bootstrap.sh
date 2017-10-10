#!/bin/bash

lerna clean --yes

cd packages/retail-components && yarn && yarn build