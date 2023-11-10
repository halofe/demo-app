
import { readFile, writeFile } from "node:fs/promises"
import createHashFromString from "@/server/utils/createHash"
import url from 'url'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const {slices, type} = body
  const projDir = url.fileURLToPath(import.meta.url.replace(/(?:.nuxt|.output)\/.*$/g, ''))
  const bufs = await Promise.all(slices.map(x => readFile(`${projDir}/public/partials/${x}`)))
  const bufConcated = Buffer.concat(bufs)

  const fileName = createHashFromString(bufConcated.toString('utf-8'))
  const fileExt = type.split('/')[1]
  const fileUrl = `/images/${fileName}.${fileExt}`
  const targetFile = `${projDir}/public` + fileUrl
  await writeFile(targetFile, bufConcated)
  return fileUrl
})