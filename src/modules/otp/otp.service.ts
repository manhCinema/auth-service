import { Injectable } from '@nestjs/common'
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
}
