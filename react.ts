/**
* Executes a callback function after a click or enter event with arguments provided in an array.
*/
export const runOnClickorEnter = <E extends KeyboardEvent | MouseEvent, A>(
  event: E extends KeyboardEvent ? KeyboardEvent : MouseEvent,
  fn: (...args: A[]) => any,
  args: A[]
) => {
  if (event.type === 'mousedown' || event.type === 'click' || (event.type === 'keydown' && (event as KeyboardEvent).key === " " || (event as KeyboardEvent).key === "Enter")) fn(...args)
}