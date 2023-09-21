import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import {
  ClientProxy,
  EventPattern,
  MessagePattern,
} from '@nestjs/microservices';

@Controller('product')
export class ProductController {
  constructor(
    private productService: ProductService,
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get()
  all() {
    this.client.emit('notifications', JSON.stringify({ process: 'get_all' }));
    return this.productService.all();
  }

  @Post()
  create(@Body() productDto: CreateProductDto) {
    this.client.emit(
      'notifications',
      JSON.stringify({ process: 'create_product' }),
    );
    return this.productService.create(productDto);
  }

  @Get('/:id')
  async get(@Param('id') id: number) {
    this.client.emit('notifications', JSON.stringify({ process: 'get_by_id' }));
    return this.productService.getById(id);
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    this.client.emit(
      'notifications',
      JSON.stringify({ process: 'update_product' }),
    );
    return this.productService.update(id, updateProductDto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    this.client.emit(
      'notifications',
      JSON.stringify({ process: 'delete_product' }),
    );
    return this.productService.delete(id);
  }

  @EventPattern('notifications')
  printNotification(data: string) {
    const dataObj = JSON.parse(data);
    console.log({ data: dataObj });
  }
}
