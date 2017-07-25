/* jshint node: true */
"use strict";
const fastbootTransform = require("fastboot-transform");

const path = require("path");

module.exports = {
  name: "ember-flickity",

  blueprintsPath() {
    return path.join(__dirname, "blueprints");
  },

  options: {
    nodeAssets: {
      flickity: {
        vendor: {
          include: ["dist/flickity.pkgd.js"],
          processTree(input) {
            return fastbootTransform(input);
          }
        }
      }
    }
  },

  included() {
    this._super.included.apply(this, arguments);
    this.import("vendor/flickity/dist/flickity.pkgd.js");
  },

  isDevelopingAddon() {
    return true;
  }
};
