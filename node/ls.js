import * as fs from "node:fs/promises"

const ls = async (path) => {
  // Return all files from a given directory path in an array of objects
  const out = []
  const dir = await fs.opendir(path) // Need to 'await' if running 'fs' async
  for await (const _file of dir) {
      const _obj = {}
      _obj.filename = _file.name // File name property
      _obj.filepath = path + _file.name // Full file path propery
      out.push(_obj) // Store file object in array of files to return
  }
  return(out)
}   
export default ls;