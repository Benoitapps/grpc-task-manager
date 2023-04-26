import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      {
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:3010',
          package: 'hello',
          protoPath: join(__dirname, 'proto/hello/hello.proto'),
        },
      },
  );

  await app.listen();
}
bootstrap();