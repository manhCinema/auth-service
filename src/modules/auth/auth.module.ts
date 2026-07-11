import { PassportModule } from '@manhdev2/passport'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { getPassportConfig } from '@/config'
import { PrismaService } from '@/infrastructure/prisma/prisma.service'
import { RedisService } from '@/infrastructure/redis/redis.service'
import { OtpService } from '@/modules/otp/otp.service'

import { AuthController } from './auth.controller'
import { AuthRepository } from './auth.repository'
import { AuthService } from './auth.service'

@Module({
	imports: [
		PassportModule.registerAsync({
			useFactory: getPassportConfig,
			inject: [ConfigService]
		})
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		AuthRepository,
		PrismaService,
		OtpService,
		RedisService
	]
})
export class AuthModule {}
