import { Module } from '@nestjs/common'

import { RedisService } from '@/infrastructure/redis/redis.service'

import { OtpService } from './otp.service'

@Module({
	controllers: [],
	providers: [OtpService, RedisService]
})
export class OtpModule {}
