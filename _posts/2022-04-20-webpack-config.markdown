---
layout: post
title: "A basic webpack configuration"
date: 2022-04-20 09:50:54
categories: webpack
---

Here is a dead simple webpack configuration for a vanilla javascript project. This will create the bundle in to the 'dist' directory. And it uses the devServer option that comes with webpack with hot reloading to make development easier.

{% highlight javascript %}
const webpack = require("webpack");
const path = require("path");

const config = {
mode: "development",
entry: "./src/index.js",
output: {
path: path.resolve(**dirname, "dist"),
filename: "bundle.js",
},
devServer: {
static: {
directory: path.join(**dirname, "dist"),
},
compress: true,
port: 9000,
},
};

module.exports = config;
{% endhighlight %}
