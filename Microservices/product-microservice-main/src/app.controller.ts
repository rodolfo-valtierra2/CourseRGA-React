import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern({role: 'product', cmd: 'create'})
  createProduct(ProductDto) {
    const createData = this.appService.createProduct(ProductDto)
    if( createData) {
      return {
        status: 200,
        message: 'Prodcut created successfully'
      }
    } 
    return {
      status: 500,
      message: 'Something weth wrong'
    }
  }

}
