/**
* Joins class names. Useful with TailwindCSS.  
* @param {Any} classes  A list or array of strings.  
*
*/
export const classNames = (...classes) => (classes.filter(Boolean).join(' '));

/**
* Clicks a given selector on a given element.
* @param {String} sel  A query selector.  
* @param {NodeList} el  A node parent to operate on. Defaults to "document".   
*
*/
export const clickSelector = (sel, el = document) => el.querySelector(sel).click();

/**
* Returns a node with a given class from an array of nodes.
* @param {Any} classes  A list or array of strings.  
*
*/
export const getClass = (className, ...els) => {
    let cycle
    for (el of els) {
        if (cycle === false) return el
        if (el.classList.contains(className)) { cycle = false }
    }
}
