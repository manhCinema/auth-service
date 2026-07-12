import { Module } from '@nestjs/common'

import { PrismaService } from '@/infrastructure/prisma/prisma.service'
import { AccountRepository } from '@/modules/account/account.repository'

import { AccountController } from './account.controller'
import { AccountService } from './account.service'

@Module({
	controllers: [AccountController],
	providers: [AccountService, AccountRepository, PrismaService]
})
export class AccountModule {}
