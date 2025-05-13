import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const taskData = [
  { "title" : "Write some code",
    "completed" : true
   },
  { "title" : "Have a nice bath",
    "completed" : false
  }
]

async function main() {
  console.log(`Start seeding ...`)
  for (const t of taskData) {
    const user = await prisma.task.create({
      data: {
          title: t.title,
          completed: t.completed
        }
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
