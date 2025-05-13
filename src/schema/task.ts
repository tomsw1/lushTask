import { builder } from "../builder";
import { prisma } from '../db'

builder.prismaObject('Task', {
  fields: (t) => ({
    id: t.exposeInt('id'),
    title: t.exposeString('title', { nullable: true }),
    completed: t.exposeBoolean('completed'),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
  }),
})

builder.queryField('task', (t) =>
  t.prismaField({
    type: 'Task',
    args: {
      id: t.arg.int({ required: true }),
    },
    nullable: true,
    resolve: (query, parent, args) => {
      return prisma.task.findUnique({
        ...query,
        where: { id: args.id },
      })
    }
  })
)

builder.mutationField('addTask', (t) =>
  t.prismaField({
    type: 'Task',
    args: {
      title: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _context) =>
      prisma.task.create({
        ...query,
        data: {
          title: args.title,
        }
      })
  })
)