// Requirements for markdown frontmatter processing
import {unified} from 'unified'
import compiler from 'remark-stringify'
import parser from 'remark-parse'
import frontmatter from "remark-frontmatter"
import extract from "remark-extract-frontmatter"
import yaml from "yaml"

const parseMarkdownFrontmatter = async (vfile) => {
  // Parse and return markdown + frontmatter data (string or virtual file)
  const parsed = {}
  unified()
      .use(parser)
      .use(compiler)
      .use(frontmatter)
      .use(extract, { yaml: yaml.parse, remove: true })
      .process(vfile, (err, _vfile) => {
          if (err) { console.error(err); return} 
          // const obj = {}
          parsed.frontmatter = _vfile.data // Extract returns 'data' property appended to input virtual file
          parsed.markdown = _vfile.value
          parsed.vfile = _vfile.toString()
      })
  return parsed
}
export default parseMarkdownFrontmatter