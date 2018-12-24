import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const NEXT_BUTTON = ".flickity-prev-next-button.next";
const PREV_BUTTON = ".flickity-prev-next-button.previous";
const PAGE_DOTS = ".flickity-page-dots";

module('Integration | Component | em-flickity', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{em-flickity}}`);
    assert.equal(this.$().html().includes('flickity-wrapper'), true);
  });

  test('hides flickity controls if false', async function(assert) {
    await render(hbs`{{em-flickity}}`);
    assert.equal(this.$().find(NEXT_BUTTON).length, 0);
    assert.equal(this.$().find(PREV_BUTTON).length, 0);
  });

  test('hides flickity controls if true', async function(assert) {
    await render(hbs`
          {{#em-flickity showSlides=true}}
            <div id="slide-1"></div>
            <div id="slide-2"></div>
          {{/em-flickity}}
      `);
    assert.equal(this.$().find(NEXT_BUTTON).length, 1);
    assert.equal(this.$().find(PREV_BUTTON).length, 1);
  });

  test('passes options to flickity', async function (assert) {
    await render(hbs`
          {{#em-flickity pageDots=true showSlides=true}}
        {{/em-flickity}}
      `);
    assert.equal(this.$().find(PAGE_DOTS).length, 1);
  });
  
  test('binds flickity events using direct parameters', async function (assert) {
    let readyEventCalled = false;
    let selectEventCalled = false;

    this.set("readyHandler", () => { 
      readyEventCalled = true; 
    });
    this.set("selectHandler", () => {
      selectEventCalled = true;
    });
    
    await render(hbs`
        {{#em-flickity showSlides=true ready=(action readyHandler) select=(action selectHandler) }}
          <div id="slide-1"></div>
          <div id="slide-2"></div>
        {{/em-flickity}}
        `);
    this.$('.flickity-wrapper').flickity('select');
    assert.equal(readyEventCalled, true, 'Ready Event Called');
    assert.equal(selectEventCalled, true, 'Select Event Called');
  });

  test('binds flickity events using events parameter', async function (assert) {
    let readyEventCalled = false;
    let selectEventCalled = false;
    this.set("events", {
        ready: () => {
          readyEventCalled = true;
        },
        select: () => {
          selectEventCalled = true;
        }
    });

    await render(hbs`
        {{#em-flickity showSlides=true events=events}}
          <div id="slide-1"></div>
          <div id="slide-2"></div>
        {{/em-flickity}}
        `);
    this.$('.flickity-wrapper').flickity('select');
    assert.equal(readyEventCalled, true, 'Ready Event Called');
    assert.equal(selectEventCalled, true, 'Select Event Called');
  });
});
