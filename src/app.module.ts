import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { grpcEnv } from '@/config'

import { PrismaModule } from './infrastructure/prisma/prisma.module'
import { RedisModule } from './infrastructure/redis/redis.module'
import { AuthModule } from './modules/auth/auth.module'
import { OtpModule } from './modules/otp/otp.module'

@Module({
	imports: [
		AuthModule,
		PrismaModule,
		ConfigModule.forRoot({
			isGlobal: true,
			load: [grpcEnv]
		}),
		RedisModule,
		OtpModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
