/**
Add default headers, parameter parsing, timeouts, and response error handling to the native fetch API.

@param {String} endpoint  Endpoint URL.
@param {Object} params  Paramters to append to endpoint.  
@param {String} token  Authentication token.
@param {Any} body HTTP message body. Automatically parsed depending on type.  
@param {Object} options Override options to pass to fetch.  
@param {String} format Format to parse data input/outut.  
@param {Number} timeout Time in milliseconds before timeout.  
@param {Boolean} useDefaults Disable default options if false.  

@example
fetchCatch("https://api.github.com/rate_limit").then(prom => console.log(prom))
fetchCatch("https://api.github.com/search/repositories", {q:"Octocat in:readme"}).then(prom => console.log(prom))

*/

export const fetchCatch = async (endpoint, params, token, body, options = {}, format = "json", timeout = undefined, useDefaults = true) => {
  let defaultOptions = {}
  const formats = ["json", "text", "blob", "formData"]
  const url = new URL(endpoint)
  url.search = params ? new URLSearchParams(params) : null
  const controller = timeout ? new AbortController() : null

  /* Guard clauses */
  try {
    if (token && typeof token !== "string") throw "Token must be a string!"
    if (timeout && typeof timeout !== "number") throw "Timeout must be a number!"
    if (format && !formats.find((item) => format === item)) throw `Format invalid! Must be one of: ${formats}.`
  } catch (err) {throw new TypeError(err)}

  /* Set default http options */
  if (!useDefaults) {
    if (Object.entries(defaultOptions).length === 0) throw "Must include options if overriding default fetch behavior!"
  } else {
    defaultOptions = {
      headers: {
        "Content-Type" : format === "json" ? "application/json;charset=utf-8" : format === "text" ? 'text/plain' : undefined,
        ...token && { "Authorization": token },

      },
      ...body && {body : format === "json" ? JSON.stringify(body) : body} && {method : "POST"},
      ...timeout && { signal: controller.signal },
    }
  }

/* const progressHandler = (responseBody) => {
 [ ] Implement progress bar per:
      1) https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream
      2) https://blog.logrocket.com/axios-vs-fetch-best-http-requests/
  }*/

  let isTimeExpired = false
  timeout && setTimeout((msg) => {controller.abort(msg) ; isTimeExpired = true}, timeout)

  const combinedOptions = {...defaultOptions, ...options}
  const response = await fetch(url, combinedOptions).catch(err => `Network error: ${err}`)
  try {
    if (isTimeExpired) throw `Timeout: ${timeout}ms exceeded`
    if (!response.ok) throw `Bad response: ${response.status} - ${response.statusText}`
    // progressHandler(response.body) // Posterity: Determine how to implement after feature is well supported and stable.  
    if(format){
      return await response[format]() // Run selected format method (e.g. "json") to parse data
    } else {
      return response // Without a format method, just return the raw HTTP response from the fetch API
    }
  } catch (err){
    console.error(err)
  }
}
export default fetchCatch