import { DatabaseConfig } from './database.interface'
import { GrpcConfig } from './grpc.interfaces'
import { RedisConfig } from './redis.interface'

export interface AllConfigs {
	grpc: GrpcConfig
	database: DatabaseConfig
	redis: RedisConfig
}
