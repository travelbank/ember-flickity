'use strict';

module.exports = {
  name: "ember-flickity",
  included() {
    this._super.included.apply(this, arguments);
    this.import("node_modules/flickity/dist/flickity.pkgd.js");
  },

  isDevelopingAddon() {
    return true;
  }
};

