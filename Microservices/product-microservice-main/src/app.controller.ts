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
  async createProduct(ProductDto) {
    const createData = await this.appService.createProduct(ProductDto)
    if(createData) {
      return {
        status: 200,
        message: 'Prodcut created successfully'
      }
    } 

    return {
      status: 500,
      message: 'Something went wrong'
    }
  }

  @MessagePattern({role: 'product', cmd: 'get-by-id'}) 
  getProductById (id: number) {
    return this.appService.getProductById(id);
  }

}
