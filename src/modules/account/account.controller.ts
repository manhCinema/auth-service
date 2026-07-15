import {
	ConfirmEmailChangeRequest,
	ConfirmEmailChangeResponse,
	ConfirmPhoneChangeRequest,
	ConfirmPhoneChangeResponse,
	GetAccountRequest,
	GetAccountResponse,
	InitEmailChangeRequest,
	InitEmailChangeResponse,
	InitPhoneChangeRequest,
	InitPhoneChangeResponse
} from '@manhdev2/contracts/gen/account'
import { Controller } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'

import { AccountService } from './account.service'

@Controller()
export class AccountController {
	constructor(private readonly accountService: AccountService) {}

	@GrpcMethod('AccountService', 'GetAccount')
	public async getAccount(
		data: GetAccountRequest
	): Promise<GetAccountResponse> {
		return await this.accountService.getAccount(data)
	}

	@GrpcMethod('AccountService', 'InitEmailChange')
	public async initEmailChange(
		data: InitEmailChangeRequest
	): Promise<InitEmailChangeResponse> {
		return await this.accountService.initChangeEmail(data)
	}

	@GrpcMethod('AccountService', 'ConfirmEmailChange')
	public async confirmEmailChange(
		data: ConfirmEmailChangeRequest
	): Promise<ConfirmEmailChangeResponse> {
		return await this.accountService.confirmEmailChange(data)
	}

	@GrpcMethod('AccountService', 'InitPhoneChange')
	public async initPhoneChange(
		data: InitPhoneChangeRequest
	): Promise<InitPhoneChangeResponse> {
		return await this.accountService.initChangePhone(data)
	}

	@GrpcMethod('AccountService', 'ConfirmPhoneChange')
	public async confirmPhoneChange(
		data: ConfirmPhoneChangeRequest
	): Promise<ConfirmPhoneChangeResponse> {
		return await this.accountService.confirmPhoneChange(data)
	}
}
