// src/hooks/useClickOutside.ts
import { useEffect, RefObject } from "react"

/**
 * Calls `handler` when a click occurs **outside** any of the refs.
 *
 * @param refs      One ref or an array of refs that define the "inside" area.
 * @param handler   Function to run on outside click.
 * @param events    Optional mouse/touch events to listen for (default: mousedown + touchstart).
 */
function useClickOutside<T extends HTMLElement = HTMLElement>(
  refs: RefObject<T> | RefObject<T>[],
  handler: (event: MouseEvent | TouchEvent) => void,
  events: ("mousedown" | "touchstart")[] = ["mousedown", "touchstart"],
): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Convert single ref → array for uniform handling
      const refArray = Array.isArray(refs) ? refs : [refs]

      // Do nothing if any ref contains the clicked target
      const isInside = refArray.some(ref => {
        return ref.current && ref.current.contains(event.target as Node)
      })

      if (!isInside) {
        handler(event)
      }
    }

    // Attach listeners
    events.forEach(ev => document.addEventListener(ev, listener))

    // Cleanup
    return () => {
      events.forEach(ev => document.removeEventListener(ev, listener))
    }
  }, [refs, handler, events])
}

export default useClickOutside