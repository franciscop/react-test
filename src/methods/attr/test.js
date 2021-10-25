import React from 'react'
import $ from '../../'
import 'babel-polyfill'

const $base = $(
  <div className='test' disabled>
    Hello
  </div>
)

describe('.attr()', () => {
  it('should be a function', () => {
    expect(typeof $(<div />).attr).toBe('function')
  })

  it('Has the correct html', () => {
    expect($base.attr('class')).toBe('test')
    expect($base.attr('disabled')).toBe('')

    // We test attributes, not properties
    expect($base.attr('className')).toBe(null)
  })

  it('works with no matched elements', () => {
    expect($base.find('button').attr('title')).toBe(null)
  })
})
