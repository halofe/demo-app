
import {del} from '@/server/services/user.js'

export default defineEventHandler(async (event) => {
  const {id} = getQuery(event)
  return del({id: Number(id)})
})