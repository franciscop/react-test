// In React 16.9 - https://github.com/facebook/react/issues/15379
// TEMPORAL
// This is a fairly experimental implementation, it emulates event propagation
// but doesn't properly handle `e.stopPropagation()`. The nice thing is that
// it can and will await properly for the async callbacks!
import { act } from 'react-dom/test-utils'

import $ from '../constructor'

const findParents = (node, list = []) => {
  list.push(node) // add current node
  // do recursion until BODY is reached
  if (node.tagName !== 'BODY') return findParents(node.parentNode, list)
  else return list
}

const getEvents = (node) => {
  if (!node) return null
  let handlers = Object.entries(node)
    .filter(([k]) => /^__reactProps/.test(k))
    .map((p) => p[1])
    .shift()
  if (handlers && Object.keys(handlers).length) {
    return handlers
  }
  handlers = Object.entries(node)
    .filter(([k]) => /^__reactEventHandlers/.test(k))
    .filter(Boolean)[0]
  if (!handlers) return null
  return handlers[1]
}

const merge = (objs) => {
  const props = {}
  // Merge recursively
  objs.forEach((obj) => {
    for (const key in obj) {
      if (props[key]) {
        for (const subKey in obj[key]) {
          props[key][subKey] = obj[key][subKey]
        }
      } else {
        props[key] = obj[key]
      }
    }
  })
  return props
}

const createEvent = (type, ...objs) => {
  const props = merge(objs)
  const event = new Event(type)
  for (const key in props) {
    Object.defineProperty(event, key, {
      value: props[key],
      enumerable: true,
      configurable: true
    })
  }
  return event
}

$.prototype.trigger = function (type, time = 0, extra = {}) {
  const propName = `on${type[0].toUpperCase() + type.slice(1)}`
  return act(async () => {
    await Promise.all(
      this.map(async (target) => {
        const parents = findParents(target)

        // The events manually registered on the root element
        if (this.events && this.events[type]) {
          const currentTarget = parents[parents.length - 1]
          const event = createEvent(type, target, { ...extra, currentTarget })
          this.events[type].map((cb) => cb(event))
        }

        // If there's a direct way of calling it e.g. `button.click()`
        if (target[type]) {
          target[type](createEvent(type, target, extra))
        } else {
          await Promise.all(
            parents
              .map((el) => [getEvents(el), el])
              .filter((ev) => ev[0])
              .map((evts) => [evts[0][propName], evts[1]])
              .filter((evts) => evts[0])
              .map(([cb, el]) => cb(createEvent(type, el, extra)))
          )
        }
      })
    )
    await new Promise((resolve) => setTimeout(resolve, time))
  })
}
