import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { AllConfigs } from '@/config'

import { MessagingService } from './messaging.service'

@Global()
@Module({
	imports: [
		ClientsModule.registerAsync([
			{
				name: 'NOTIFICATIONS_CLIENT',
				useFactory: (configService: ConfigService<AllConfigs>) => ({
					transport: Transport.RMQ,
					options: {
						urls: [
							configService.get<string>('rmq.url', {
								infer: true
							})
						],
						queue: 'notifications_queue',
						queueOptions: {
							durable: true
						}
					}
				}),
				inject: [ConfigService]
			}
		])
	],
	controllers: [],
	providers: [MessagingService]
})
export class MessagingModule {}
