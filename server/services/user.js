
import prisma from "@/server/services/prisma";

const defaultFields = {
  id: true,
  name: true,
  gender: true,
  age: true,
  avatar: true,
}

export function list() {
  return prisma.user.findMany({
    select: defaultFields
  })
}

export function get(id) {
  return prisma.user.findUnique({
    select: defaultFields,
    where: { id }
  })
}

export function update(data) {
  const {id, ...updates} = data
  console.log(id, updates, 222)
  return prisma.user.update({
    where: { id },
    data: updates,
  })
}

export function create(data) {
  return prisma.user.create({
    data,
  })
}

export function del(id) {
  return prisma.user.delete({
    where: {id},
  })
}