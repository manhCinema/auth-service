import { RpcStatus } from '@manhdev2/common'
import {
	RefreshRequest,
	SendOtpRequest,
	VerifyOtpRequest
} from '@manhdev2/contracts/gen/auth'
import { Injectable } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { Account } from '@prisma/generated/client'

import { OtpService } from '@/modules/otp/otp.service'
import { TokenService } from '@/modules/token/token.service'
import { UserRepository } from '@/shared/repositories'

import { AuthRepository } from './auth.repository'

@Injectable()
export class AuthService {
	public constructor(
		private readonly authRepository: AuthRepository,
		private readonly userRepository: UserRepository,
		private readonly otpService: OtpService,
		private readonly tokenService: TokenService
	) {}
	public async sendOtp(data: SendOtpRequest) {
		const { identifier, type } = data
		let account: Account | null
		if (type === 'phone') {
			account = await this.userRepository.findByPhone(identifier)
		} else account = await this.userRepository.findByEmail(identifier)

		if (!account) {
			account = await this.authRepository.create({
				email: type === 'email' ? identifier : null,
				phone: type === 'phone' ? identifier : null
			})
		}

		const { code, hash } = await this.otpService.send(
			identifier,
			type as 'phone' | 'email'
		)
		console.log(code, hash)
		return { ok: true }
	}

	public async verifyOtp(data: VerifyOtpRequest) {
		const { identifier, type, code } = data

		await this.otpService.verify(
			identifier,
			code,
			type as 'phone' | 'email'
		)

		let account: Account | null
		if (type === 'phone') {
			account = await this.userRepository.findByPhone(identifier)
		} else account = await this.userRepository.findByEmail(identifier)

		if (!account)
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: 'Account not found'
			})
		if (type === 'phone' && !account.isPhoneVerified) {
			await this.userRepository.update(account.id, {
				isPhoneVerified: true
			})
		}
		if (type === 'email' && !account.isEmailVerified) {
			await this.userRepository.update(account.id, {
				isEmailVerified: true
			})
		}
		return this.tokenService.generateTokens(account.id)
	}

	public async refresh(data: RefreshRequest) {
		const { refreshToken } = data
		const res = this.tokenService.verify(refreshToken)
		if (!res.valid) {
			throw new RpcException({
				code: RpcStatus.UNAUTHENTICATED,
				details: res.reason
			})
		}
		return this.tokenService.generateTokens(res.userId)
	}
}
