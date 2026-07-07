import {
	Injectable,
	Logger,
	OnModuleDestroy,
	OnModuleInit
} from '@nestjs/common'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from 'prisma/generated/client'

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	private readonly logger = new Logger(PrismaService.name)

	public constructor() {
		const adapter = new PrismaPg(process.env.DATABASE_URL || '')
		super({ adapter })
	}

	async onModuleInit() {
		const start = Date.now()
		this.logger.log('Connecting to the database...')
		try {
			await this.$connect()
			const ms = Date.now() - start
			this.logger.log(`Connected to the database in ${ms}ms`)
		} catch (error) {
			this.logger.error('Failed to connect to the database')
			throw error
		}
	}

	async onModuleDestroy() {
		this.logger.log('Disconnecting from the database...')
		try {
			await this.$disconnect()
			this.logger.log('Disconnected from the database')
		} catch (error) {
			this.logger.error('Failed to disconnect from the database')
			throw error
		}
	}
}
