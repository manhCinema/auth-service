import { registerAs } from '@nestjs/config'

import { GrpcValidator } from '@/config/validators'
import { validateEnv } from '@/shared/utils'

import { GrpcConfig } from '../interfaces'

export const grpcEnv = registerAs<GrpcConfig>('grpc', () => {
	validateEnv(process.env, GrpcValidator)

	return {
		host: process.env.GRPC_HOST,
		port: parseInt(process.env.GRPC_PORT)
	}
})
