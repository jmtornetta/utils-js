/* Logical tests */
const test_blanks = (...args) => { // 'True' if any arguments are undefined/null/empty.
    for (a of args) {
        if (typeof a === 'undefined' || a === null || a === '') { return true }
    } return false
}

const test_typeArray = (x) => Object.prototype.toString.call(x) === '[object Array]'; // 'True' if type is array.

const test_typeObjectPure = (x) => typeof x === 'object' && test_typeArray(x) === false; // 'True' if type is object but not array.

const test_emptyObjectPure = (object) => { // 'True' if all properties of an object are null, undefined, or empty string.
    if (test_typeObjectPure(object) === false) throw "Input is not an object";
    else return Object.values(object).every(prop => prop === null || prop === '');
}

/* Simple methods to return date/time */
Date.prototype.getFullDate = function (cat) { if (!cat) { cat = '' } return (this.getFullYear() + cat + (((this.getMonth() + 1) < 10) ? "0" : "") + cat + (this.getMonth() + 1) + cat + ((this.getDate() < 10) ? "0" : "") + this.getDate()) }
Date.prototype.getFullTime = function (cat) { if (!cat) { cat = '' } return (((this.getHours() < 10) ? "0" : "") + this.getHours() + cat + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + cat + ((this.getSeconds() < 10) ? "0" : "") + this.getSeconds()) }
// Sample: const prefixTime = `${new Date().getFullDate() + '_' + new Date().getFullTime()}`

/* Misc */
const sleep = (ms) => { return new Promise(resolve => setTimeout(resolve, ms)); } // Makes script/function to pause.

const click_selector = (sel, el = document) => el.querySelector(sel).click(); // Clicks a given selector on a given element.

const find_classFromNodelist = (_class, ...els) => { // Returns a node with a given class from a node list.
    let cycle
    for (el of els) {
        if (cycle === false) return el
        if (el.classList.contains(_class)) {cycle = false}
    }
}