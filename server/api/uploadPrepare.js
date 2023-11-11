
import { access, constants } from 'node:fs/promises';
import url from 'node:url'
import {join} from 'node:path'

async function fileExists(path) {
  try {
    await access(path, constants.F_OK)
    return true
  } catch(ex) {
  }
  return false
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const {chunks} = body
  const projDir = url.fileURLToPath(import.meta.url.replace(/(?:.nuxt|.output)\/.*$/g, ''))
  const chunkStatus = {}
  await Promise.all(chunks.map(async x => {
    const chunkFileName = join(projDir, 'public/partials', x.hash)
    chunkStatus[x.hash] = await fileExists(chunkFileName)
  }))
  return chunkStatus
})