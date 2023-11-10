import { createHash } from "crypto";
import { readFile } from "fs/promises"; 


export default function createHashFromString(content) {
  return createHash("md5").update(content).digest("hex");
}

export async function createHashFromFile(path) {
  const fileContent = (await readFile(path)).toString('utf-8');
  return createHashFromString(fileContent)
}