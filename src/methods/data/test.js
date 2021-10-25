import React from 'react'
import $ from '../../'
import 'babel-polyfill'

describe('.data()', () => {
  it('returns the correct value when reading a data-attribute', () => {
    const $hello = $(<div data-id='0'>Hello</div>)
    expect($hello.data('id')).toBe('0')
  })
  it('returns null if the data-attribute is not present in the node', () => {
    const $hello = $(<div id='0'>Hello</div>)
    expect($hello.data('id')).toBe(null)
  })
})
