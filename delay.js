/**
Delay and limit function execution by a given time, keeping the latest execution.  
@param {Function} fn  Callback function
@param {Number} delay  Milliseconds
@param {Any} args Arguments for debounced function instance
@example
1. debounce(() => console.log('hello world'))()
2. const delayClick = debounce(() => clickButton(), 1000); delayClick()
3. const delayFetch = debounce(fetchSomeApi, 1000); delayFetch("https://api.github.com")
// Test cases
const delayClick = debounce((msg)=>console.log(msg))
delayClick(1); //=> null
delayClick(2); //=> null
delayClick(3); //=> 3
*/
export const debounce = (fn, delay = 500) => {
  let runs = 0; // Run counter is a backup for timeout
  let timerId;
  return (...args) => {
    runs++
    const currentRun = runs
    clearTimeout(timerId); // Prevent many timers running concurrently
    timerId = setTimeout(() => {
      if (currentRun === runs) fn(...args) // Backup if timeout is not cleared
    }, delay);
  };
}

/**
Prevent additional function executions for a given time.  
@param {Function} fn  Callback function
@param {Number} delay  Milliseconds
@param {Any} args Arguments for throttled function instance
@example
1. throttle(() => console.log('hello world'))()
2. const throttleClick = throttle(() => clickButton(), 1000); throttleClick()
3. const throttleFetch = throttle(fetchSomeApi, 1000); throttleFetch("https://api.github.com")
// Test cases
const throttleClick = throttle((msg)=>console.log(msg))
throttleClick(1); //=> 1
throttleClick(2); //=> null
throttleClick(3); //=> null
*/
export const throttle = (fn, delay = 500) => {
  let allowed = true;
  let timerId;
  return (...args) => {
    if (!allowed) return;
    fn(...args);
    allowed = false;
    timerId = setTimeout(() => allowed = true, delay);
  };
}

