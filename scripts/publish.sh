#!/bin/bash

pkgname=v-track-plus

version=$(npm view $pkgname version)

echo "$pkgname now verison : $version"

read -p "Please enter a new version: "  new_version

npm version $new_version
