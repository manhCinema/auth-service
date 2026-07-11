import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { AllConfigs } from '@/config'
import { createGrpcServer } from '@/infrastructure/grpc/grpc.server'

import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const config = app.get(ConfigService<AllConfigs>)
	createGrpcServer(app, config)
	await app.startAllMicroservices()
	await app.init()
}
bootstrap()
