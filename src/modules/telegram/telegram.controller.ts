import {
	TelegramCompleteRequest,
	TelegramCompleteResponse,
	TelegramInitResponse,
	TelegramVerifyRequest,
	TelegramVerifyResponse
} from '@manhdev2/contracts/gen/auth'
import { Controller } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'

import { TelegramService } from './telegram.service'

@Controller()
export class TelegramController {
	constructor(private readonly telegramService: TelegramService) {}

	@GrpcMethod('AuthService', 'TelegramInit')
	public async getAuthUrl(): Promise<TelegramInitResponse> {
		return this.telegramService.getAuthUrl()
	}
	@GrpcMethod('AuthService', 'TelegramVerify')
	public async telegramVerify(
		data: TelegramVerifyRequest
	): Promise<TelegramVerifyResponse> {
		return this.telegramService.verify(data)
	}
	@GrpcMethod('AuthService', 'TelegramComplete')
	public async complete(
		data: TelegramCompleteRequest
	): Promise<TelegramCompleteResponse> {
		return this.telegramService.complete(data)
	}
}
