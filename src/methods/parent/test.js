import React from 'react';
import $ from '../../';
import 'babel-polyfill';

const $list = $(
  <ul className="baz">
    <li className="foo">A</li>
    <li className="bar">
      <a href="#" className="bar">
        Link 1
      </a>
    </li>
    <li className="foo">
      <a href="#" className="bar">
        Link 2
      </a>
    </li>
  </ul>
);

describe('.parent()', () => {
  it('returns only the direct parent of a single node', async () => {
    expect($list.find('li').parent()).toHaveClass('baz');
  });

  it('returns multiple parents of multiple nodes', async () => {
    expect($list.find('a').parent()).toHaveLength(2);
  });

  it('returns empty if no parent node', async () => {
    expect($list.find('li').parent('.baz')).toHaveLength(0);
  });
});
