import * as fs from "node:fs/promises"

const ls = async (path) => {
  // Return all files from a given directory path in an array of objects
  const filenames = []
  const dir = await fs.opendir(path) // Need to 'await' if running 'fs' async
  for await (const _file of dir) filenames.push(_file.name) // If calling 'ls' on 'path' the filepath can be derived and is unnecessary.  
  return filenames
}   
export default ls;
