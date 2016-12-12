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

  eventKeys: computed(function getEventKeys() {
    return [
      "cellSelect",
      "select",
      "settle",
      "scroll",
      "dragStart",
      "dragMove",
      "dragEnd",
      "pointerDown",
      "pointerMove",
      "pointerUp",
      "staticClick",
      "lazyLoad",
      "bgLazyLoad"
    ];
  }),

  didInsertElement() {
    if (get(this, "showSlides")) {
      set(this, "widget", this.$().flickity(this._getOptions()));
      this._setupEvents();
    }
  },

  willDestroyElement() {
    if (get(this, "widget")) {
      get(this, "widget").flickity("destroy");
    }
  },

  _setupEvents() {
    const $widget = get(this, "widget");

    get(this, "eventKeys").forEach(key => {
      $widget.on(`${key}.flickity`, (event, pointer, cellElement, cellIndex) => {
        if (this.attrs[key]) {
          this.attrs[key](
            cellIndex || $widget.data("flickity").selectedIndex,
            $widget.data("flickity")
          );
        }
      });
    });
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
