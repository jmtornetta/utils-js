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
