import { Module } from '@nestjs/common'

import { PrismaService } from '@/infrastructure/prisma/prisma.service'

import { AuthController } from './auth.controller'
import { AuthRepository } from './auth.repository'
import { AuthService } from './auth.service'

@Module({
	controllers: [AuthController],
	providers: [AuthService, AuthRepository, PrismaService]
})
export class AuthModule {}
