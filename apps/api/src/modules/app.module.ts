import { Module } from '@nestjs/common'
import { MailerModule } from '@nestjs-modules/mailer'
import { env } from '@semicek-innovations/env'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: env.GMAIL_USER,
          pass: env.GMAIL_PASS
        }
      },
      defaults: {
        from: 'no-reply@semicekinnovations.com'
      }
    }),
    PrismaModule,
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
