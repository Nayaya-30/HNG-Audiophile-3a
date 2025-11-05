'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
// src/hooks/useClickOutside.ts
var react_1 = require('react')
/**
 * Calls `handler` when a click occurs **outside** any of the refs.
 *
 * @param refs      One ref or an array of refs that define the "inside" area.
 * @param handler   Function to run on outside click.
 * @param events    Optional mouse/touch events to listen for (default: mousedown + touchstart).
 */
function useClickOutside(refs, handler, events) {
  if (events === void 0) {
    events = ['mousedown', 'touchstart']
  }
  ;(0, react_1.useEffect)(
    function () {
      var listener = function (event) {
        // Convert single ref → array for uniform handling
        var refArray = Array.isArray(refs) ? refs : [refs]
        // Do nothing if any ref contains the clicked target
        var isInside = refArray.some(function (ref) {
          return ref.current && ref.current.contains(event.target)
        })
        if (!isInside) {
          handler(event)
        }
      }
      // Attach listeners
      events.forEach(function (ev) {
        return document.addEventListener(ev, listener)
      })
      // Cleanup
      return function () {
        events.forEach(function (ev) {
          return document.removeEventListener(ev, listener)
        })
      }
    },
    [refs, handler, events],
  )
}
exports.default = useClickOutside
