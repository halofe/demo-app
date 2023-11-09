
import {rename} from 'node:fs/promises'
import formidable from 'formidable'
import { createHashFromFile } from '~/prisma/utils/createHash';
import {join} from 'path'

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
  const projDir = import.meta.url.replace(/^file:\/\/|(?:.nuxt|.output)\/.*$/g, '')
  let fileUrl
  if(!sliced) {
    const fileExt = file[0].mimetype.split('/')[1]
    fileUrl = `/images/${fileName}.${fileExt}`
  } else {
    fileUrl = `/partials/${fileName}`
  }
  const targetPath = join(projDir, 'public', fileUrl)
  await rename(tmpPath, targetPath)
  console.log({sliced, fileName})
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