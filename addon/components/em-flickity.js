import Component from '@ember/component';
import { computed, get, set, getProperties } from '@ember/object';
import { run } from '@ember/runloop';
import layout from '../templates/components/em-flickity';

export default Component.extend({
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

  didInsertElement(...args) {
    this._super(...args);
    run.later(() => {
      if (get(this, "showSlides")) {
        set(this, "_widget", this.$().flickity(this._getOptions()));
      }
    }, 0);
  },

  willDestroyElement() {
    const $widget = get(this, "_widget");

    if ($widget) {
      get(this, "eventKeys").forEach(evt => $widget.off(evt));
      $widget.flickity("destroy");
    }
  },

  _setupEvents() {
    const eventHandlers = {};
    let events = get(this, "events");
    let eventsList = get(this, "eventKeys");
    let eventsFromParameters = true;

    if (events) {
      eventsList = Object.keys(events);
      eventsFromParameters = false;
    } else {
      events = this.attrs; // eslint-disable-line ember/no-attrs-in-components
    }

    eventsList.forEach(key => {
      const eventFunc = eventsFromParameters ? get(this, key): events[key];
      if (eventFunc) {
        eventHandlers[key] = (...args) => {
          run.later(() => {
            const $widget = get(this, "_widget").data("flickity");
            eventFunc(...args, $widget);
          },0);
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
    //console.log(events);
    if (Object.keys(events).length > 0) {
      props.on = events;
    }

    return props;
  }
});
