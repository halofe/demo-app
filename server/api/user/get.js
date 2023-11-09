
import {get} from '@/server/services/user.js'

export default defineEventHandler(async (event) => {
  const {id} = getQuery(event)
  return get(Number(id))
})