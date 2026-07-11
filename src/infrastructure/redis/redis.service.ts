import {
	Injectable,
	Logger,
	OnModuleDestroy,
	OnModuleInit
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Redis from 'ioredis'

import { AllConfigs } from '@/config'

@Injectable()
export class RedisService
	extends Redis
	implements OnModuleInit, OnModuleDestroy
{
	private readonly logger = new Logger(RedisService.name)

	public constructor(
		private readonly configService: ConfigService<AllConfigs>
	) {
		super({
			host: configService.get('redis.host', { infer: true }),
			port: configService.get('redis.port', { infer: true }),
			username: configService.get('redis.user', { infer: true }),
			password: configService.get('redis.password', { infer: true }),
			maxRetriesPerRequest: 5,
			enableAutoPipelining: true
		})
	}

	async onModuleInit() {
		const start = Date.now()
		this.logger.log('Connecting to Redis...')
		this.on('connect', () => {
			this.logger.log('Redis connecting')
		})
		this.on('ready', () => {
			this.logger.log(`Redis connected in ${Date.now() - start}ms`)
		})
		this.on('error', err => {
			this.logger.error(`Redis error: ${err.message}`, err.stack)
		})
		this.on('close', () => {
			this.logger.log('Redis connection closed')
		})
		this.on('reconnecting', () => {
			this.logger.log('Redis reconnecting...')
		})
	}

	async onModuleDestroy() {
		this.logger.log('Closing Redis connection...')
		try {
			await this.quit()
			this.logger.log('Redis connection closed successfully')
		} catch (error: any) {
			this.logger.error(
				`Error occurred while closing Redis connection: ${error.message}`,
				error.stack
			)
		}
	}
}
