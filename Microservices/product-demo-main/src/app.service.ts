import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('PRODUCT_MICROSERVICE') private readonly client: ClientProxy) {

  }

  getHello(): string {
    return 'Hello World!';
  }

  createProdict (CreateProductDto ){
    return this.client.send({
      role: 'product',
      cmd: 'create'
    }, CreateProductDto)
  }

  getProductById(id: number) {
    return this.client.send({
      role: 'product',
      cmd: 'get-by-id'
    }, id)
  }
}
