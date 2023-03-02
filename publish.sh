#!/bin/bash

npm version

read -p "请输入版本号: "  publish_version


npm version $publish_version