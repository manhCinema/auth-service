import { RpcStatus } from '@manhdev2/common'
import { convertEnum } from '@manhdev2/common'
import { GetAccountRequest } from '@manhdev2/contracts/gen/account'
import { Injectable } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { Role } from '@prisma/generated/enums'

import { AccountRepository } from '@/modules/account/account.repository'

@Injectable()
export class AccountService {
	public constructor(private readonly accountRepository: AccountRepository) {}
	public async getAccount(data: GetAccountRequest) {
		const { id } = data
		const account = await this.accountRepository.findById(id)
		if (!account)
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: 'Account not found'
			})

		return {
			id: account.id,
			phone: account.phone,
			email: account.email,
			isEmailVerified: account.isEmailVerified,
			isPhoneVerified: account.isPhoneVerified,
			role: convertEnum(Role, account.role)
		}
	}
}
