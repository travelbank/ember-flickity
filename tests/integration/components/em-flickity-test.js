/* jshint expr:true */
import { expect } from "chai";
import { setupComponentTest } from "ember-mocha";
import { describe, it } from "mocha";
import hbs from "htmlbars-inline-precompile";

const NEXT_BUTTON = ".flickity-prev-next-button.next";
const PREV_BUTTON = ".flickity-prev-next-button.previous";
const PAGE_DOTS = ".flickity-page-dots";

describe("Integration: EmFlickityComponent", function () {
  setupComponentTest("em-flickity", {
    integration: true
  });

  it("renders", function () {
    this.render(hbs`{{em-flickity}}`);
    expect(this.$()).to.have.length(1);
  });

  describe("showSlides", function () {
    it("hides flickity controls if false", function () {
      this.render(hbs`{{em-flickity}}`);

      expect(this.$(NEXT_BUTTON)).to.have.length(0);
      expect(this.$(PREV_BUTTON)).to.have.length(0);
    });

    it("shows flickity controls if true", function () {
      this.render(hbs`
          {{#em-flickity showSlides=true}}
            <div id="slide-1"></div>
            <div id="slide-2"></div>
          {{/em-flickity}}
      `);

      expect(this.$(NEXT_BUTTON)).to.have.length(1);
    });
  });

  it("passes options to flickity", function () {
    this.render(hbs`
        {{#em-flickity pageDots=true showSlides=true}}
        {{/em-flickity}}
        `);

    expect(this.$(PAGE_DOTS)).to.have.length(1);
  });

  [
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
  ].forEach(event => {
    it(`binds to the ${event} flickity event`, function () {
      let eventCalled;

      this.set("handler", () => { eventCalled = true; });
      this.render(hbs`
          {{#em-flickity showSlides=true cellSelect=(action handler) select=(action handler)
                        settle=(action handler) scroll=(action handler)
                        dragStart=(action handler) dragMove=(action handler)
                        dragEnd=(action handler) pointerDown=(action handler)
                        pointerMove=(action handler) pointerUp=(action handler)
                        staticClick=(action handler) lazyLoad=(action handler)
                        bgLazyLoad=(action handler) }}
            <div id="slide-1"></div>
            <div id="slide-2"></div>
          {{/em-flickity}}
          `);

      this.$(".flickity-wrapper").trigger(`${event}.flickity`);
      expect(eventCalled).to.equal(true);
    });
  });
});

describe("when EmFlickityComponent is nested in another component", function () {
  setupComponentTest("nested-em-flickity", {
    integration: true
  });

  it("renders", function () {
    this.set("options", [1, 2, 3, 4, 5]);

    this.render(hbs`
      {{nested-em-flickity options=options currentIndex=0}}
      {{nested-em-flickity options=options currentIndex=1}}
      {{nested-em-flickity options=options currentIndex=2}}
      {{nested-em-flickity options=options currentIndex=3}}
      {{nested-em-flickity options=options currentIndex=4}}
    `);

    expect(this.$(".item")).to.have.length(25);
  });
});
