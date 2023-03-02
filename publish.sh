#!/bin/bash

version=$(npm view v-track-plus version)

echo "v-track-plus now verison : $version"

read -p "Please enter a new version: "  new_version

npm version $new_version
