import React from 'react';
import $ from '../../';
import '../index.js';

const $div = $(
  <div>
    <span>I am a span</span>
    <span>Im also here</span>
  </div>
);

describe('.toHaveHtml()', () => {
  it('works for a simple case', () => {
    expect($div).toHaveHtml('<span>');
  });

  it('requires valid html', () => {
    expect(() => expect($div).toHaveHtml('<h1>')).toThrow(
      'Expected <div> to have `<h1>`'
    );
  });

  it('checks parent element as well', () => {
    expect($div).toHaveHtml('<div>');
  });

  it('validates all substrings of innerHTML', () => {
    expect($div).toHaveHtml('<span>I am a span</span>');
    expect($div).toHaveHtml('<span>Im also here</span>');
  });

  it('does not accept invalid HTML', () => {
    const invalidHTMLs = ['<span', 'plain text', '<madeup>'];
    for (const invalidHTML of invalidHTMLs) {
      expect(() => expect($div).toHaveHtml(invalidHTML)).toThrow(
        'Invalid HTML. Please input valid HTML'
      );
    }
  });

  it('negatively asserts non-existent HTML', () => {
    expect($div).not.toHaveHtml('<h1>');
    expect(() => expect($div).not.toHaveHtml('<span>')).toThrow(
      'Expected <div> not to have `<span>`'
    );
  });

  describe('multiple elements', () => {
    const $divs = $(
      <section>
        <div id="div-1">
          <span>span</span>
        </div>
        <div id="div-2">
          <span>span</span>
          <span>flower span</span>
        </div>
      </section>
    ).find('div');

    const validInnerHTML = ['<span>span</span>', '<span>'];
    const invalidInnerHTML = ['<p>', '<li>', '<span>div</span>'];

    it('requires all elements to contain html', () => {
      for (const validHTML of validInnerHTML) {
        expect($divs).toHaveHtml(validHTML);
      }

      // Throws on first child with non-contained HTML
      for (const invalidHTML of invalidInnerHTML) {
        expect(() => expect($divs).toHaveHtml(invalidHTML)).toThrow(
          `Expected <div id="div-1"> to have \`${invalidHTML}\``
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
          `Expected <div id="div-1"> not to have \`${validHTML}\``
        );
      }
    });
  });
});
