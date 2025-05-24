import { Module } from '@nestjs/common'
import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { env } from '@semicek-innovations/env'
import * as path from 'path'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'
import { StripeModule } from './stripe/stripe.module'
import { SubscriptionModule } from './subscription/subscription.module'
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
        from: env.GMAIL_NO_REPLY
      },
      template: {
        dir: path.join(process.cwd(), 'src', 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true
        }
      }
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    StripeModule,
    SubscriptionModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
