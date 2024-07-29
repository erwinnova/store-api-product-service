import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PG_CONNECTION } from 'src/constants';
import { PaginationOptionsDto } from 'src/paginate/pagination-options.dto';

@Injectable()
export class ProductService {
  constructor(@Inject(PG_CONNECTION) private conn: any) {}

  async create(createProductDto: CreateProductDto) {
    const { name, sku, image, price, description } = createProductDto;
    const { rows } = await this.conn.query(
      `SELECT * FROM products WHERE sku='${sku}' LIMIT 1`,
    );

    if (rows.length > 0) {
      throw new ConflictException('product already exist');
    }

    const product = await this.conn.query(
      `INSERT INTO products (name, sku, image, price, description)
      VALUES('${name}','${sku}','${image}',${price},'${description}') RETURNING *;`,
    );

    return product.rows[0];
  }

  async findAll(options: PaginationOptionsDto) {
    const products = await this.conn.query(
      `SELECT * FROM products LIMIT ${options.size} OFFSET ${options.page * options.size}`,
    );
    return products.rows;
  }

  async findOne(id: number) {
    const { rows } = await this.conn.query(
      `SELECT * FROM products WHERE id='${id}' LIMIT 1`,
    );

    if (rows.length === 0) {
      throw new NotFoundException('product not found');
    }

    return rows[0];
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { name, sku, image, price, description } = updateProductDto;
    const { rows } = await this.conn.query(
      `SELECT * FROM products WHERE id='${id}' LIMIT 1`,
    );

    if (rows.length === 0) {
      throw new NotFoundException('product not found');
    }

    const existingSku = await this.conn.query(
      `SELECT * FROM products WHERE sku='${sku}' LIMIT 1`,
    );

    if (existingSku.rows.length > 0) {
      if (existingSku.rows[0].id !== id) {
        if (existingSku.rows[0].sku === sku) {
          throw new ConflictException('product already exist');
        }
      }
    }

    const updatedProduct = await this.conn.query(`UPDATE products
      SET name = '${name}', sku = '${sku}', image = '${image}', price = ${price},
      description = '${description}' WHERE id = ${id} RETURNING *;`);
    return updatedProduct.rows[0];
  }

  async remove(id: number) {
    const { rows } = await this.conn.query(
      `SELECT * FROM products WHERE id='${id}' LIMIT 1`,
    );

    if (rows.length === 0) {
      throw new NotFoundException('product not found');
    }

    await this.conn.query(`DELETE FROM products WHERE id = ${id};`);

    return 'success';
  }
}
