/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { SendOtpRequest, VerifyOtpRequest } from '@manhdev2/contracts/gen/auth'
import { Injectable } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { Account } from '@prisma/generated/client'

import { OtpService } from '@/modules/otp/otp.service'

import { AuthRepository } from './auth.repository'

@Injectable()
export class AuthService {
	public constructor(
		private readonly authRepository: AuthRepository,
		private readonly otpService: OtpService
	) {}
	public async sendOtp(data: SendOtpRequest) {
		const { identifier, type } = data
		let account: Account | null
		if (type === 'phone') {
			account = await this.authRepository.findByPhone(identifier)
		} else account = await this.authRepository.findByEmail(identifier)

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
			account = await this.authRepository.findByPhone(identifier)
		} else account = await this.authRepository.findByEmail(identifier)

		if (!account) throw new RpcException('Account not found')
		if (type === 'phone' && !account.isPhoneVerified) {
			await this.authRepository.update(account.id, {
				isPhoneVerified: true
			})
		}
		if (type === 'email' && !account.isEmailVerified) {
			await this.authRepository.update(account.id, {
				isEmailVerified: true
			})
		}
		return {
			accessToken: '',
			refreshToken: ''
		}
	}
}
