/**
Throttles callback function executions to one per timeout limit, keeping the last input or event.  
@param {Function} ms  Callback function
@param {Number} ms  Milliseconds
@param {Any} args Arguments for function
@example
throttle(console.log, 1000, 'first click')
throttle(console.log, 1000, 'second click')
throttle(console.log, 1000, 'third click')
*/
export const throttle = (() => {
  let runs = 0
  return (fn, ms, ...args) => {
    runs += 1 // Number of function calls
    const currentRun = runs
    setTimeout(() => {
      if (currentRun === runs) fn(...args)
    }, ms)
  }
})()
export default throttle
