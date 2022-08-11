/**
* Makes scriptpause.
* @param {Number} ms  Milliseconds
*
*/
export const sleep = (ms) => (new Promise(resolve => setTimeout(resolve, ms)));
export default sleep