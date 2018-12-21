import Ember from "ember";
import layout from "../templates/components/em-flickity";

const { computed, get, getProperties, set } = Ember;

export default Ember.Component.extend({
  layout,
  classNames: ["flickity-wrapper"],
  _widget: null,
  showSlides: false,
  events: null,

  // some default flickity settings
  cellAlign: "center",
  contain: true,
  friction: 0.8,
  pageDots: false,
  selectedAttraction: 0.125,
  setGallerySize: false,

  // these are for events that happen on create, if not they don't happen
  delayTime: 200,
  delayedEvents: computed(function getDelayedEvents() {
    return ["ready"];
  }),

  optionKeys: computed(function getOptionKeys() {
    return [
      "draggable",
      "freeScroll",
      "wrapAround",
      "groupCells",
      "autoPlay",
      "fullscreen",
      "adaptiveHeight",
      "watchCSS",
      "asNavFor",
      "hash",
      "dragThreshold",
      "selectedAttraction",
      "friction",
      "freeScrollFriction",
      "imagesLoaded",
      "lazyLoad",
      "bgLazyLoad",
      "cellSelector",
      "initialIndex",
      "accessibility",
      "setGallerySize",
      "resize",
      "cellAlign",
      "contain",
      "percentPosition",
      "rightToLeft",
      "prevNextButtons",
      "pageDots",
      "arrowShape"
    ];
  }),

  eventKeys: computed(function getEventKeys() {
    return [
      "ready",
      "change",
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
      "bgLazyLoad",
      "fullscreenChange"
    ];
  }),

  didInsertElement() {
    if (get(this, "showSlides")) {
      set(this, "_widget", this.$().flickity(this._getOptions()));
    }
  },

  willDestroyElement() {
    const $widget = get(this, "_widget");

    if ($widget) {
      get(this, "eventKeys").forEach(evt => evt.off());
      $widget.flickity("destroy");
    }
  },

  _setupEvents() {
    const eventHandlers = {};
    let events = get(this, "events");
    let eventsList = get(this, "eventKeys");

    if (events) {
      eventsList = Object.keys(events);
    } else {
      events = this.attrs;
    }

    eventsList.forEach(key => {
      if (events[key]) {
        const isDelayed = get(this, "delayedEvents").includes(key);
        const delayTime = isDelayed ? get(this, "delayTime") : 1;

        eventHandlers[key] = (event, pointer, cellElement, cellIndex) => {
          setTimeout(() => {
            const $widget = get(this, "_widget");

            events[key](cellIndex || $widget.data("flickity").selectedIndex,
              $widget.data("flickity"));
          }, delayTime);
        };
      }
    });

    return eventHandlers;
  },

  _getOptions() {
    const propKeys = get(this, "optionKeys");
    const props = getProperties(this, ...propKeys);

    Object.keys(props).forEach(prop => {
      if (!props[prop] && typeof props[prop] !== "boolean") {
        delete props[prop];
      }
    });

    const events = this._setupEvents() || {};

    if (Object.keys(events).length > 0) {
      props.on = events;
    }

    return props;
  }
});
