import Ember from 'ember';
import layout from '../templates/components/em-flickity';

const { $, get, getProperties, set } = Ember;

export default Ember.Component.extend({
  layout,
  classNames: ['flickity-wrapper'],
  showSlides: false,
  widget: null,

  // flickity settings
  cellAlign: 'center',
  contain: true,
  setGallerySize: false,
  pageDots: false,
  selectedAttraction: 0.125,
  friction: 0.8,

  didInsertElement() {
    if (get(this, 'showSlides')) {
      set(this, 'widget', this.$().flickity(this._getOptions()));
    }
  },

  willDestroyElement() {
    if (get(this, 'widget')) {
      get(this, 'widget').flickity('destroy');
    }
  },

  _getOptions() {
    const props = [
      'contain',
      'setGallerySize',
      'pageDots',
      'selectedAttraction',
      'friction'
    ];

    return getProperties(this, ...props);
  }
});
