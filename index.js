/* jshint node: true */
"use strict";
const fastbootTransform = require("fastboot-transform");

const path = require("path");

module.exports = {
  name: "ember-flickity",

  blueprintsPath() {
    return path.join(__dirname, "blueprints");
  },

  nodeAssets: {
    flickity: {
      vendor: {
        include: ["dist/flickity.pkgd.js"],
        processTree(input) {
          return fastbootTransform(input);
        }
      }
    }
  },

  isDevelopingAddon() {
    return true;
  }
};
