import { Injectable } from '@nestjs/common'
import { Account } from '@prisma/generated/client'

import { PrismaService } from '@/infrastructure/prisma/prisma.service'

@Injectable()
export class AccountRepository {
	public constructor(private readonly prismaService: PrismaService) {}

	public async findById(id: string): Promise<Account | null> {
		return await this.prismaService.account.findUnique({
			where: {
				id
			}
		})
	}
}
