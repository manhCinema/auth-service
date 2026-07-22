import { Module } from '@nestjs/common'

import { MessagingService } from '@/infrastructure/messaging/messaging.service'
import { PrismaService } from '@/infrastructure/prisma/prisma.service'
import { RedisService } from '@/infrastructure/redis/redis.service'
import { AccountRepository } from '@/modules/account/account.repository'
import { OtpService } from '@/modules/otp/otp.service'
import { UserRepository } from '@/shared/repositories'

import { AccountController } from './account.controller'
import { AccountService } from './account.service'

@Module({
	controllers: [AccountController],
	providers: [
		AccountService,
		AccountRepository,
		PrismaService,
		UserRepository,
		OtpService,
		RedisService,
		MessagingService
	]
})
export class AccountModule {}
