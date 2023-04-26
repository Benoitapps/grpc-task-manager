import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {GrpcMethod} from "@nestjs/microservices";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('HelloService')
  sayHello(req) {
    const name = req.name;
    return {
      message: `Hello ${name}`,
    };
  }
}
