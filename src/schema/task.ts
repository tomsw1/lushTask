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

//Queries

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

builder.queryField('tasks', (t) =>
  t.prismaField({
    type: ['Task'],
    args: {
      search: t.arg.string()
    },
    nullable: true,
    resolve: (query, parent, args) => {
      
      const whereClause = args.search
        ? { title: { contains: args.search } }
        : {}

      return prisma.task.findMany({
        ...query,
        where: {
          ...whereClause
        }
      })
    }
  })
)

//Mutations

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

builder.mutationField('toggleTask', (t) =>
  t.prismaField({
    type: 'Task',
    args: {
      id: t.arg.int({ required: true }),
    },
    resolve: async (query, _parent, args, _context) => {
      const taskToggled = await prisma.task.findUnique({
        where: { id: args.id},
        select: { completed: true }
      })

      if (!taskToggled){
        return taskToggled;
      }
      
      return prisma.task.update({
        ...query,
        where: { id: args.id},
        data: {completed: !taskToggled.completed}
      })
    }
  })
)