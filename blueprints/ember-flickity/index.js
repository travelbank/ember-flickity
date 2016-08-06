module.exports = {
  name: "ember-flickity",

  normalizeEntityName() {},

  afterInstall() {
    return this.addBowerPackageToProject("flickity");
  }
}
