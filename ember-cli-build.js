/* jshint node:true*/
/* global require, module */
const EmberAddon = require("ember-cli/lib/broccoli/ember-addon");
const fastbootTransform = require("fastboot-transform");

module.exports = function exports(defaults) {
  const app = new EmberAddon(defaults, {
    nodeAssets: {
      flickity: {
        import: {
          srcDir: "dist",
          include: ["flickity.pkgd.js"],
          processTree(input) {
            return fastbootTransform(input);
          }
        }
      }
    }
  });

  return app.toTree();
};
