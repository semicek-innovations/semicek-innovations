import { Injectable } from '@nestjs/common'

import { PrismaService } from './prisma/prisma.service'

@Injectable()
export class AppService {
  constructor(private prismaService: PrismaService) {}

  async Juice() {
    const dbPing = await this.prismaService.$queryRaw`SELECT 1`

    const emoji = ['🍊', '🍍', '🍓', '🥤', '🍉', '🍋']
    const random = emoji[Math.floor(Math.random() * emoji.length)]

    return {
      status: 'alive',
      flavor: `${random} refreshing as ever!`,
      db: dbPing,
      time: new Date().toISOString()
    }
  }
}
