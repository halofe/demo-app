
import {rename} from 'node:fs/promises'
import formidable from 'formidable'
import { createHashFromFile } from '@/server/utils/createHash';
import {join} from 'node:path'
import url from 'node:url'

export default defineEventHandler(async (event) => {
  const headers = getRequestHeaders(event);
  let body
  if(headers['content-type']?.includes('multipart/form-data')) {
    body = await parseMultipart(event.node.req)
  } else {
    body = await readBody(event)
  }
  const {file, sliced} = body
  if(!(file && file.length)) {
    return ''
  }
  const tmpPath = file[0].filepath
  const fileName = await createHashFromFile(tmpPath)
  const projDir = url.fileURLToPath(import.meta.url.replace(/(?:.nuxt|.output)\/.*$/g, ''))
  let fileUrl
  if(!sliced) {
    const fileExt = file[0].mimetype.split('/')[1]
    fileUrl = `/images/${fileName}.${fileExt}`
  } else {
    fileUrl = `/partials/${fileName}`
  }
  const targetPath = join(projDir, 'public', fileUrl)
  await rename(tmpPath, targetPath)
  return sliced ? fileName : fileUrl
})

function parseMultipart(req) {
  return new Promise((resolve, reject) => {
    /** @see https://github.com/node-formidable/formidable/ */
    const form = formidable({ multiples: true })
    form.parse(req, (error, fields, files) => {
      if (error) {
        reject(error);
        return;
      }
      resolve({ ...fields, ...files });
    });
  });
}