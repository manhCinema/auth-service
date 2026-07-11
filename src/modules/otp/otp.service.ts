import { Injectable } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { createHash } from 'node:crypto'
import { generateCode } from 'patcode'

import { RedisService } from '@/infrastructure/redis/redis.service'

@Injectable()
export class OtpService {
	public constructor(private readonly redisService: RedisService) {}

	public async send(identifier: string, type: 'phone' | 'email') {
		const { code, hash } = await this.generateOtp()
		await this.redisService.set(
			`otp:${type}:${identifier}`,
			hash,
			'EX',
			300
		)
		return { code, hash }
	}

	private async generateOtp() {
		const code = generateCode()
		const hash = createHash('sha256').update(code).digest('hex')
		return { code, hash }
	}

	public async verify(
		identifier: string,
		code: string,
		type: 'phone' | 'email'
	) {
		const storedHash = await this.redisService.get(
			`otp:${type}:${identifier}`
		)
		if (!storedHash) {
			throw new RpcException({
				code: 5,
				details: 'Invalid or expired code'
			})
		}
		const incomingHash = createHash('sha256').update(code).digest('hex')
		if (storedHash !== incomingHash)
			throw new RpcException({
				code: 5,
				details: 'Invalid or expired code'
			})
		await this.redisService.del(`otp:${type}:${identifier}`)
	}
}
