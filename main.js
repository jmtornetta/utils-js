const test_blanks = (...args) => {
    for (a of args) {
        if (typeof a === 'undefined' || a === null || a === '') { return true }
    } return false
}

const test_typeArray = (x) => Object.prototype.toString.call(x) === '[object Array]'; // Check if type is array

const test_typeObjectPure = (x) => typeof x === 'object' && test_typeArray(x) === false; // Check if type is object but not array

const test_emptyObjectPure = (object) => { // Check if all properties of an object are null, undefined, or empty string
    if (test_typeObjectPure(object) === false) throw "Input is not an object";
    else return Object.values(object).every(prop => prop === null || prop === '');
}

const click_selector = (sel, el = document) => el.querySelector(sel).click();

const find_classFromNodelist = (_class, ...els) => {
    let cycle
    for (el of els) {
        if (cycle === false) return el
        if (el.classList.contains(_class)) {cycle = false}
    }
}