import { Module } from '@nestjs/common'

import { PrismaService } from '@/infrastructure/prisma/prisma.service'
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
		OtpService
	]
})
export class AccountModule {}
