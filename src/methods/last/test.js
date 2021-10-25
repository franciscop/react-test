import React from 'react'
import $ from '../../'
import 'babel-polyfill'

const $list = $(
  <ul>
    <li>A</li>
    <li>B</li>
    <li>C</li>
  </ul>
)

describe('.last()', () => {
  it('will get the top-level tag', async () => {
    expect($list.last().nodeName).toBe('UL')
  })

  it('will get the last of the children', async () => {
    expect($list.find('li').last().textContent).toEqual('C')
  })
})
