import {
	Injectable,
	Logger,
	OnModuleDestroy,
	OnModuleInit
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Redis from 'ioredis'

@Injectable()
export class RedisService
	extends Redis
	implements OnModuleInit, OnModuleDestroy
{
	private readonly logger = new Logger(RedisService.name)

	public constructor(private readonly configService: ConfigService) {
		super({
			host: configService.getOrThrow<string>('REDIS_HOST'),
			port: configService.getOrThrow<number>('REDIS_PORT'),
			username: configService.getOrThrow<string>('REDIS_USER'),
			password: configService.getOrThrow<string>('REDIS_PASSWORD'),
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
