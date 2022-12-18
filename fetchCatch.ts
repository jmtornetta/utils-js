
/* Todos
TODO-MAYBE Implement progress bar per:
  1) https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream
  2) https://blog.logrocket.com/axios-vs-fetch-best-http-requests/
*/

/**
Adds reasonable defaults, parameter parsing, timeouts, response error handling, generic return-type typecasting, and intellisense request content-types to the native fetch API.

@param input - A string or URL. Converted to URL at runtime.  
@param [options.urlParameters] - URL parameters to append to endpoint. Retains existing parameters.   
@param [options.requestFormat = 'application/json'] - The header content-type (with typed intellisense). 
@param [options.responseFormatMethod = 'json'] - The method to call to format the response. 
@param [options.token] - Authentication token.
@param [options.timeout = 0] - Time in milliseconds before timeout. Specify 0 (default) for no timeout. 
@param [options.consoleLogs = 'all'] - Silence console.log ('errors') or all messages ('none').

@example
fetchCatch("https://api.github.com/rate_limit")
fetchCatch("https://api.github.com/rate_limit",{responseFormatMethod: 'none',})
fetchCatch<Record<string,any>>("https://api.github.com/search/repositories?utm_source=google", {urlParameters : {q:"Octocat in:readme"}, timeout: 9000, consoleLogs: 'errors' })

*/

/* Function overloads */
// Default function signature. 'Options' redundancy provided for hover-over intellisense.
export async function fetchCatch<TPromiseReturnType>(
  input: URL | string,
  options: Partial<{
    urlParameters: URLSearchParams | {[key:string]:string},
    requestFormat: HeaderContentType,
    responseFormatMethod: 'json' | 'text' | 'formData' | 'blob' | 'arrayBuffer',
    token: string,
    timeout: number,
    consoleLogs: 'all' | 'errors' | 'none',
    body: BodyInit, // Also included in 'RequestInit' but left here for VSCode hover-over-clarity.
    headers: HeadersInit, // Also included in 'RequestInit' but left here for VSCode hover-over-clarity. Overrides other specified headers props.
  }>
) : Promise<TPromiseReturnType>
export async function fetchCatch(
  input: FetchInput,
  options: {responseFormatMethod: 'none'} & Partial<IOptions>
) : Promise<Response>
export async function fetchCatch<TPromiseReturnType>(
  input: string | URL,
  options: Partial<IOptions> = {}
) {
  const {
    requestFormat = 'application/json',
    responseFormatMethod = 'json',
    timeout = 0,
    consoleLogs = 'all',
    urlParameters,
    token,
    body,
    headers,
    ...restOfOptions
  } = options

  const url = new URL(input)
  url.search = '?' + url.searchParams.toString() + (urlParameters ? '&' + new URLSearchParams(urlParameters).toString() : '')

  const log = (isError:boolean, ...message: any) => {
    if(consoleLogs === 'none') return
    if(isError) return console.error(...message)
    if(consoleLogs === 'all') return console.log(...message)
  }
  const controller = timeout ? new AbortController() : false

  const request = {
    headers: {
      "Content-Type": requestFormat,
      ...token && { "Authorization": token },
      ...headers,
    },
    ...body && { body: requestFormat.match(/json|javascript$/) ? JSON.stringify(body) : body },
    ...body && { method: "POST" },
    ...timeout && controller && { signal: controller.signal },
  }

  let isTimeExpired = false
  const timeoutMessage = `Timeout! ${timeout}ms exceeded`
  const timerId = controller && setTimeout(() => {
    controller.abort(timeoutMessage)
    log(true, timeoutMessage)
    isTimeExpired = true
  }, timeout)
  
  try {
    const response = await fetch(url, { ...request, ...restOfOptions })
    if (typeof response === 'string') throw Error(`No response. ${response}`)
    if (!response.ok) throw Error(`Bad response! ${response.status + response.statusText}`)
    if (isTimeExpired) throw Error(timeoutMessage)

    log(false, 'Fetch complete!', response.headers)
    if (timerId) clearTimeout(timerId)
    if (responseFormatMethod === 'none') return response

    const formatResponse : TPromiseReturnType = await response[responseFormatMethod]()
    log(false, 'Response:', formatResponse)
    return formatResponse
  } catch (err) {
    if (timerId) clearTimeout(timerId)
    let errMsg = 'Fetch failed! '
    errMsg += err instanceof Error ? err.message : `${err}`
    log(true, errMsg)
  }
}
type FetchInput = URL | string;
type HeaderContentType = (
  "application/EDI-X12" |
  "application/EDIFACT" |
  "application/javascript" |
  "application/octet-stream" |
  "application/ogg" |
  "application/pdf" |
  "application/xhtml+xml" |
  "application/x-shockwave-flash" |
  "application/json" |
  "application/ld+json" |
  "application/xml" |
  "application/zip" |
  "application/x-www-form-urlencoded" |
  "audio/mpeg" |
  "audio/x-ms-wma" |
  "audio/vnd.rn-realaudio" |
  "audio/x-wav" |
  "image/gif" |
  "image/jpeg" |
  "image/png" |
  "image/tiff" |
  "image/vnd.microsoft.icon" |
  "image/x-icon" |
  "image/vnd.djvu" |
  "image/svg+xml" |
  "text/css" |
  "text/csv" |
  "text/html" |
  "text/plain" |
  "text/xml" |
  "video/mpeg" |
  "video/mp4" |
  "video/quicktime" |
  "video/x-ms-wmv" |
  "video/x-msvideo" |
  "video/x-flv" |
  "video/webm"
)
interface IOptions extends RequestInit {
  urlParameters: URLSearchParams | {[key:string]:string},
  requestFormat: HeaderContentType,
  responseFormatMethod: keyof Response & ('json' | 'text' | 'formData' | 'blob' | 'arrayBuffer') | 'none',
  token: string,
  timeout: number,
  consoleLogs: 'all' | 'errors' | 'none',
}