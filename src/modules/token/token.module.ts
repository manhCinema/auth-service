import { PassportModule } from '@manhdev2/passport'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { getPassportConfig } from '@/config'

import { TokenController } from './token.controller'
import { TokenService } from './token.service'

@Module({
	controllers: [TokenController],
	providers: [TokenService],
	exports: [TokenService],
	imports: [
		PassportModule.registerAsync({
			useFactory: getPassportConfig,
			inject: [ConfigService]
		})
	]
})
export class TokenModule {}
