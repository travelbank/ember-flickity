/* jshint expr:true */
import { expect } from "chai";
import { describeComponent, it } from "ember-mocha";
import hbs from "htmlbars-inline-precompile";

describeComponent("em-flickity", "Integration: EmFlickityComponent", { integration: true }, function () {
  it("renders", function () {
    this.render(hbs`{{em-flickity}}`);
    expect(this.$()).to.have.length(1);
  });
});
