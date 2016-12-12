/* jshint node: true */
"use strict";

const path = require("path");

module.exports = {
  name: "ember-flickity",

  blueprintsPath() {
    return path.join(__dirname, "blueprints");
  },

  included(app) {
    this._super(app);

    if (process.env.EMBER_CLI_FASTBOOT) { return; }

    const flickityPath = path.join(app.bowerDirectory, "flickity/dist");

    if (app.env === "production") {
      app.import(path.join(flickityPath, "flickity.pkgd.min.js"));
    } else {
      app.import(path.join(flickityPath, "flickity.pkgd.js"));
    }
  },

  isDevelopingAddon() {
    return true;
  }
};
