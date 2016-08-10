import Ember from "ember";
import layout from "../templates/components/em-flickity";

const { computed, get, getProperties, set } = Ember;

export default Ember.Component.extend({
  layout,
  classNames: ["flickity-wrapper"],
  showSlides: false,
  widget: null,

  // some default flickity settings
  cellAlign: "center",
  contain: true,
  friction: 0.8,
  pageDots: false,
  selectedAttraction: 0.125,
  setGallerySize: false,

  optionKeys: computed(function getOptionKeys() {
    return [
      "accessibility",
      "adaptiveHeight",
      "arrowShape",
      "asNavFor",
      "autoPlay",
      "bgLazyLoad",
      "draggable",
      "gragThreshold",
      "cellAlign",
      "cellSelector",
      "contain",
      "freeScroll",
      "freeScrollFriction",
      "friction",
      "groupCells",
      "imagesLoaded",
      "initialIndex",
      "lazyLoad",
      "pageDots",
      "percentPosition",
      "prevNextButtons",
      "resize",
      "rightToLeft",
      "selectedAttraction",
      "setGallerySize",
      "watchCSS",
      "wrapAround"
    ];
  }),

  didInsertElement() {
    if (get(this, "showSlides")) {
      set(this, "widget", this.$().flickity(this._getOptions()));
    }
  },

  willDestroyElement() {
    if (get(this, "widget")) {
      get(this, "widget").flickity("destroy");
    }
  },

  _getOptions() {
    const propKeys = get(this, "optionKeys");
    const props = getProperties(this, ...propKeys);

    Object.keys(props).forEach(prop => {
      if (!props[prop] && typeof props[prop] !== "boolean") {
        delete props[prop];
      }
    });

    return props;
  }
});
