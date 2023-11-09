
import {list} from '@/server/services/user.js'

export default defineEventHandler(async (event) => {
  return list()
})