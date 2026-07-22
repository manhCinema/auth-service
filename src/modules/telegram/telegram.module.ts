import { Module } from '@nestjs/common'

import { RedisService } from '@/infrastructure/redis/redis.service'
import { TelegramRepository } from '@/modules/telegram/telegram.repository'
import { TokenService } from '@/modules/token/token.service'
import { UserRepository } from '@/shared/repositories'

import { TelegramController } from './telegram.controller'
import { TelegramService } from './telegram.service'

@Module({
	controllers: [TelegramController],
	providers: [
		TelegramService,
		TelegramRepository,
		RedisService,
		TokenService,
		UserRepository
	]
})
export class TelegramModule {}
