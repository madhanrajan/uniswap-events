import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function create(hash:string,exchangePair:string){
    await prisma.item.create({data: {
        hash: hash,
        exchangePair: exchangePair

    }})
    const allItems = await prisma.item.findMany()
    console.log(`Number of entries: ${allItems.length}`)

}