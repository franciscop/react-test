import React from 'react';
import $ from '../../';
import '../index.js';

const $div = $(
  <div>
    <span id="inner-span">I am a span</span>
    <span>Im also here</span>
  </div>
);
const validInnerHTML = '<span id="inner-span">I am a span</span>';
const invalidInnerHTML = '<span id="inner-span" />';

describe('.toHaveHtml()', () => {
  it('works for a simple case', () => {
    const html = '<span id="inner-span">I am a span</span>';
    expect($div).toHaveHtml(html);
  });

  it('requires valid html', () => {
    expect(() => expect($div).toHaveHtml(invalidInnerHTML)).toThrow(
      'Expected <div> to have <span id="inner-span" />'
    );
  });

  it('trims html provided', () => {
    const validInnerSpacedHTML = `    ${validInnerHTML}     `;
    expect($div).toHaveHtml(validInnerSpacedHTML);
  });

  it('validates parent element', () => {
    expect($div).toHaveHtml('div');
  });

  it('validates all substrings of innerHTML', () => {
    const span = '<span>Im also here</span>';
    expect($div).toHaveHtml(span);

    const spanText = 'Im also here';
    expect($div).toHaveHtml(spanText);
  });

  it('negatively asserts non-contained html', () => {
    expect($div).not.toHaveHtml(invalidInnerHTML);
    expect(() => expect($div).not.toHaveHtml(validInnerHTML)).toThrow(
      'Expected <div> not to have <span id="inner-span">I am a span</span>'
    );
  });

  it('negatively asserts partially written invalid HTML', () => {
    const invalidHTML = "I'm also here";
    expect($div).not.toHaveHtml(invalidHTML);
  });

  describe('multiple elements', () => {
    const $divs = $(
      <body>
        <div id="div-1">
          <span>span</span>
        </div>
        <div id="div-2">
          <span>span</span>
          <span>flower span</span>
        </div>
      </body>
    ).find('div');

    const validInnerHTML = ['<span>span</span>', 'span', '<span>span'];
    const invalidInnerHTML = ['<span$', 'flowee', '<span>div</span>'];

    it('requires all elements to contain html', () => {
      for (const validHTML of validInnerHTML) {
        expect($divs).toHaveHtml(validHTML);
      }

      // Throws on first child with non-contained HTML
      for (const invalidHTML of invalidInnerHTML) {
        expect(() => expect($divs).toHaveHtml(invalidHTML)).toThrow(
          `Expected <div id="div-1"> to have ${invalidHTML}`
        );
      }
    });

    it('negatively asserts multiple elements', () => {
      for (const invalidHTML of invalidInnerHTML) {
        expect($divs).not.toHaveHtml(invalidHTML);
      }

      // Throws on first child with valid HTML
      for (const validHTML of validInnerHTML) {
        expect(() => expect($divs).not.toHaveHtml(validHTML)).toThrow(
          `Expected <div id="div-1"> not to have ${validHTML}`
        );
      }
    });
  });
});
