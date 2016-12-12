# Ember-flickity

An Ember addon for [flickity](http://flickity.metafizzy.co/)

## Installation

```
ember install ember-flickity
```

## Usage

```handlebars
{{#em-flickity class="my-slideshow" showSlides=(gt items.length 1)}}
  {{#each items as |item|}}
    <div class="my-slideshow__item"></div>
  {{/each}}
{{/em-flickity}}
```

`showSlides` is a Boolean. This allows you to enable or disable flickity based on the
number of items you have in the list.

## Flickity options and events

All [options][flickityOptions] and [events][flickityEvents] are supported.

[flickityEvents]: http://flickity.metafizzy.co/events.html#flickity-events
[flickityOptions]: http://flickity.metafizzy.co/options.html

```handlebars
{{#em-flickity pageDots=true draggable=true showSlides=(gt numItems 1) settle=(action 'mySettle')}}

{{/em-flickity}}
```
