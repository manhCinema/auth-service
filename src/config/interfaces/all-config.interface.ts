import { DatabaseConfig } from './database.interface'
import { GrpcConfig } from './grpc.interfaces'

export interface AllConfigs {
	grpc: GrpcConfig
	database: DatabaseConfig
}
