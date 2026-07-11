import { registerAs } from '@nestjs/config'

import { validateEnv } from '@/shared/utils'

import { RedisConfig } from '../interfaces'
import { RedisValidator } from '../validators'

export const redisEnv = registerAs<RedisConfig>('redis', () => {
	validateEnv(process.env, RedisValidator)

	return {
		host: process.env.REDIS_HOST,
		port: parseInt(process.env.REDIS_PORT),
		user: process.env.REDIS_USER,
		password: process.env.REDIS_PASSWORD
	}
})
