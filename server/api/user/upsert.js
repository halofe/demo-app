
import {create, update} from '@/server/services/user.js'

export default defineEventHandler(async (event) => {
  const user = await readBody(event)
  return user.id ? update(user) : create(user)
})