
import { readFile, writeFile } from "fs/promises"
import createHashFromString from "@/utils/createHash"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log(body, 22)
  const {slices, type} = body
  const projDir = import.meta.url.replace(/^file:\/\/|(?:.nuxt|.output)\/.*$/g, '')
  const bufs = await Promise.all(slices.map(x => readFile(`${projDir}/public/partials/${x}`)))
  const bufConcated = Buffer.concat(bufs)

  const fileName = createHashFromString(bufConcated.toString('utf-8'))
  const fileExt = type.split('/')[1]
  const fileUrl = `/images/${fileName}.${fileExt}`
  const targetFile = `${projDir}/public` + fileUrl
  await writeFile(targetFile, bufConcated)
  return fileUrl
})