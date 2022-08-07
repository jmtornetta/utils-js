/* Logical tests */
export const is = (function () {
    // 'True' if any arguments are undefined/null/empty.
    const blanks = (...args) => { for (let a of args) { if (typeof a === 'undefined' || a === null || a === '') { return true } } return false };
    // 'True' if type is array.
    const typeArray = (x) => Object.prototype.toString.call(x) === '[object Array]';
    // 'True' if type is 'object' but not 'array' or 'null'.
    const typeObjectPure = (x) => typeof x === 'object' && !typeArray(x) && x !== null;

    /**
    Returns 'true' if all properties/subproperties of an object are null, undefined, or empty.
    @param {Array} objs An array of objects
    @return {Boolean} Whether the object is completely empty
    @example 
    is.emptyObjectPure([{nothing:''},{something:{sub1: { nothing: '' } }, sub2: { something: 'hello' }}]) //=> false
    is.emptyObjectPure([{nothing:''},{something:{sub1: { nothing: '' } }, sub2: { something: '' }}]) //=> true
    */
    const emptyObjectPure = (objs) => {
        const _subObjs = []
        for (let obj of objs) {
            for (let val of Object.values(obj)) {
                if (!blanks(val) && !typeObjectPure(val)) return false // Stop if any 'blanks' found
                else if (typeObjectPure(val)) _subObjs.push(val) // Create array of subobjects
            }
        }
        if (_subObjs.length > 0) return emptyObjectPure(_subObjs); // Recurse subobjects
        return true
    }
    return { blanks, typeArray, typeObjectPure, emptyObjectPure }
})()

/* Simple methods to return date/time */
export const temporal = (function(){
    const _convertToDate = (_str) => (_str) ? new Date(_str) : new Date()
    /*(_day = _convertToDate(day),cat) =>*/
    const date = (day, cat = '') => {
        const _day = _convertToDate(day)
        return (_day.getFullYear() + cat + (((_day.getMonth() + 1) < 10) ? "0" : "") + (_day.getMonth() + 1) + cat + ((_day.getDate() < 10) ? "0" : "") + _day.getDate()); 
    }
    const time = (day, cat = '') => { 
        const _day = _convertToDate(day)
        return (((_day.getHours() < 10) ? "0" : "") + _day.getHours() + cat + ((_day.getMinutes() < 10) ? "0" : "") + _day.getMinutes() + cat + ((_day.getSeconds() < 10) ? "0" : "") + _day.getSeconds()); }
    return {date,time}
})()

/* Misc */

/**
* Makes scriptpause.
* @param {Number} ms  Milliseconds
*
*/
export const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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
const throttle = (() => {
    let runs = 0
    return (fn, ms, ...args) => {
      runs += 1
      const currentRun = runs
      setTimeout(() => {
        if (currentRun === runs) fn(...args)
      }, ms)
    }
  })()

export const click_selector = (sel, el = document) => el.querySelector(sel).click(); // Clicks a given selector on a given element.

export const find_classFromNodelist = (_class, ...els) => { // Returns a node with a given class from a node list.
    let cycle
    for (el of els) {
        if (cycle === false) return el
        if (el.classList.contains(_class)) { cycle = false }
    }
}
