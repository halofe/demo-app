import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";


export default function createHashFromString(content, alg = 'md5') {
  return createHash(alg).update(content).digest("hex");
}

export async function createHashFromFile(path, alg = 'md5') {
  const fileContent = await readFile(path);
  return createHashFromString(fileContent, alg)
}