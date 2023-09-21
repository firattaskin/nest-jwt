import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async all(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async create(data): Promise<Product> {
    return this.productRepository.save(data);
  }

  async getById(id: number) {
    return this.productRepository.findOne({ where: { id } });
  }

  async update(id: number, data) {
    return this.productRepository.update(id, data);
  }

  async delete(id: number) {
    return this.productRepository.delete(id);
  }
}
