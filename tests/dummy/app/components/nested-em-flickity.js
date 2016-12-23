import Ember from "ember";
import layout from "../templates/components/nested-em-flickity";

export default Ember.Component.extend({
  layout,

  flickity: null,

  didUpdateAttrs() {
    this._super(...arguments);
    this.handleAmountChange();
  },

  handleAmountChange() {
    const index = this.get("currentIndex");
    this.get("flickity").select(index);
  },

  actions: {
    handleSettle(index, flickity) {
      this.selectionEnabled = true;
      this.set("flickity", flickity);
    },
  },
});
