import React from 'react';
import $ from '../../';
import 'babel-polyfill';

const $list = $(
  <ul>
    <li className="foo">A</li>
    <li className="bar">B</li>
    <li className="foo">
      <a href="#" className="bar">
        Link
      </a>
    </li>
  </ul>
);

describe('.filter()', () => {
  it('returns only nodes which matched the selector', async () => {
    expect($list.find('li').filter('.foo')).toHaveLength(2);
  });

  it('only checks current nodes, not their children', async () => {
    expect($list.find('li').filter('.bar')).toHaveLength(1);
  });

  it('returns empty if no matching nodes', async () => {
    expect($list.find('li').filter('.baz')).toHaveLength(0);
  });
});
