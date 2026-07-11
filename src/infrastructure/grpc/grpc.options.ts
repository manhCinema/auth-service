import { PROTO_PATHS } from '@manhdev2/contracts'
import { GrpcOptions } from '@nestjs/microservices'

export const grpcPackages = ['auth.v1']
export const grpcProtoPaths = [PROTO_PATHS.AUTH]
export const grpcLoader: NonNullable<GrpcOptions['options']['loader']> = {
	keepCase: true,
	longs: String,
	enums: String,
	defaults: true,
	oneofs: true
}
