import { ChannelCredentials, ServerCredentials } from '@grpc/grpc-js';
import {
  ClientProviderOptions,
  GrpcOptions,
  Transport,
} from '@nestjs/microservices';
import { readFileSync } from 'fs';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';
import { join } from 'path';

export default (): GrpcOptions =>
  addReflectionToGrpcConfig({
    transport: Transport.GRPC,
    options: {
      package: 'auth.v1alpha',
      url: `0.0.0.0:${process.env.PORT || 4003}`,
      credentials:
        process.env.insecure === 'false'
          ? ServerCredentials.createSsl(null, [
              {
                private_key: readFileSync(process.env.AUTH_KEY),
                cert_chain: readFileSync(process.env.AUTH_CERT),
              },
            ])
          : ServerCredentials.createInsecure(),
      loader: {
        includeDirs: [join(__dirname, 'proto')],
      },
      protoPath: [join(__dirname, './proto/auth/v1alpha/service.proto')],
    },
  });

export const userGrpcOptions = (): ClientProviderOptions => ({
  name: 'user',
  transport: Transport.GRPC,
  options: {
    url: process.env.USER_API_URL,
    package: 'user.v1alpha',
    loader: {
      includeDirs: [join(__dirname, 'proto')],
    },
    protoPath: [join(__dirname, 'proto/user/v1alpha/service.proto')],
    keepalive: {
      // Send keepalive pings every 10 seconds, default is 2 hours.
      keepaliveTimeMs: 10 * 1000,
      // Keepalive ping timeout after 5 seconds, default is 20 seconds.
      keepaliveTimeoutMs: 5 * 1000,
      // Allow keepalive pings when there are no gRPC calls.
      keepalivePermitWithoutCalls: 1,
    },
    credentials:
      process.env.insecure === 'false'
        ? ChannelCredentials.createSsl(
            readFileSync(process.env.ROOT_CA),
            readFileSync(process.env.AUTH_KEY),
            readFileSync(process.env.AUTH_CERT),
          )
        : ChannelCredentials.createInsecure(),
  },
});