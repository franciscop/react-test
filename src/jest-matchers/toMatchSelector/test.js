import React from 'react'
import $ from '../../'
import '../index.js'

const $button = $(
  <button id='the-button' className='a-button'>
    click
  </button>
)
const $nestedButton = $(
  <div id='one'>
    <div id='two'>
      <button>click</button>
    </div>
  </div>
)

describe('.toMatchSelector()', () => {
  it('works for a simple case', () => {
    expect($button).toMatchSelector('#the-button')
    expect($button).toMatchSelector('.a-button')
    expect($nestedButton.find('button')).toMatchSelector('#one #two button')
  })

  it('requires an HTMLelement', () => {
    const msg = 'expect() should receive an HTMLElement or React Test instance'
    expect(() => expect(null).toMatchSelector('.kiwi')).toThrow(msg)
    expect(() => expect('random').toMatchSelector('.kiwi')).toThrow(msg)
  })

  it('requires a valid instance', () => {
    expect(() => expect({}).toMatchSelector('.kiwi')).toThrow(
      'expect() should receive an HTMLElement or React Test instance'
    )
  })

  it('requires the correct selector', () => {
    expect(() => expect($button).toMatchSelector('.the-button')).toThrow(
      'Expected <button id="the-button" class="a-button"> to match selector, .the-button'
    )
  })

  it('negatively asserts unmatched selectors', () => {
    expect($button).not.toMatchSelector('.the-button')

    // throws when selector exists when negatively asserting
    expect(() => expect($button).not.toMatchSelector('.a-button')).toThrow(
      'Expected <button id="the-button" class="a-button"> not to match selector, .a-button'
    )
  })

  describe('multiple elements', () => {
    const $list = $(
      <ul>
        <li id='first-list-item' className='list-item'>
          apple
        </li>
        <li className='list-item'>apple</li>
      </ul>
    )

    it('requires all elements to have the same selector', () => {
      expect($list.find('li')).toMatchSelector('.list-item')

      // Throws error on the first un-matched selector
      expect(() =>
        expect($list.find('li')).toMatchSelector('#impossible')
      ).toThrow(
        'Expected <li id="first-list-item" class="list-item"> to match selector, #impossible'
      )
    })

    it('requires all elements to not have the same selector', () => {
      expect($list.find('li')).not.toMatchSelector('#impossible')

      // At least one item has the id, first-list-item
      expect(() =>
        expect($list.find('li')).not.toMatchSelector('#first-list-item')
      ).toThrow(
        'Expected <li id="first-list-item" class="list-item"> not to match selector, #first-list-item'
      )
    })
  })
})
