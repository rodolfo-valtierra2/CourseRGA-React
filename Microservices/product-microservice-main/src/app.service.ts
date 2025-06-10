import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './product_dto';
import { ProductEntity } from './product_entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(@InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>) {

  }

  getHello(): string {
    return 'Hello World!';
  }

  createProduct (productDto: CreateProductDto) {
    return this.productRepository.save(productDto)
  }

  getProductById (id) {
    return this.productRepository.findOne(id);
  }
}
