import { Injectable } from '@nestjs/common'
import { Account } from '@prisma/generated/client'
import { AccountCreateInput } from '@prisma/generated/models'

import { PrismaService } from '@/infrastructure/prisma/prisma.service'

@Injectable()
export class AuthRepository {
	public constructor(private readonly prismaService: PrismaService) {}

	public async findByPhone(phone: string) {
		return this.prismaService.account.findUnique({
			where: {
				phone
			}
		})
	}
	public async findByEmail(email: string) {
		return this.prismaService.account.findUnique({
			where: {
				email
			}
		})
	}

	public async create(data: AccountCreateInput): Promise<Account> {
		return await this.prismaService.account.create({
			data
		})
	}
}
