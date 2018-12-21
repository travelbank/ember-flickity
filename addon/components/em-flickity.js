import Ember from "ember";
import layout from "../templates/components/em-flickity";

const { computed, get, getProperties, set } = Ember;

export default Ember.Component.extend({
  layout,
  classNames: ["flickity-wrapper"],
  eventHandlers: [],
  showSlides: false,
  widget: null,

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
      "wrapAround",
      "events"
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
      "bgLazyLoad",
      "ready",
      "change"
    ];
  }),

  didInsertElement() {
    if (get(this, "showSlides")) {
      set(this, "widget", this.$().flickity(this._getOptions()));
    }
  },

  willDestroyElement() {
    const $widget = get(this, "widget");

    if ($widget) {
      get(this, "eventKeys").forEach(evt => evt.off());
      $widget.flickity("destroy");
    }
  },

  _setupEvents() {
    const eventHandlers = {};
    let events = this.attrs;
    let eventsList = get(this, "eventKeys");

    if (this.attrs["events"]) {
      events = get(this, "events");
      eventsList = Object.keys(events);
    }

    eventsList.forEach(key => {
      if (events[key]) {
        const isDelayed = get(this, "delayedEvents").includes(key);
        const delayTime = isDelayed ? get(this, "delayTime") : 1;

        eventHandlers[key] = (event, pointer, cellElement, cellIndex) => {
          setTimeout(() => {
            const $widget = get(this, "widget");

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

    const events = this._setupEvents();

    if (Object.keys(events) > 0) {
      props.on = events;
    }

    return props;
  }
});
