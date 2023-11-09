
import prisma from "./prisma";


export function list() {
  return prisma.user.findMany()
}

export function get1(id) {
  console.log(222, {id})
  return prisma.user.findUnique({
    where: { id }
  })
}

export function update(data) {
  const {id, ...updates} = data
  return prisma.user.update({
    where: { id },
    data: updates,
  })
}

export function create(data) {
  return prisma.user.update({
    data,
  })
}

export function del(data) {
  return prisma.user.delete({
    where: data,
  })
}