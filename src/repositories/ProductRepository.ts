import { Repository, DataSource } from "typeorm";
import { Product } from "../entities/Product";

export class ProductRepository {
  private repository: Repository<Product>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Product);
  }

  public async getAllProducts(): Promise<Product[]> {
    return this.repository.find();
  }

  public async getProductById(id: number): Promise<Product | null> {
    return this.repository.findOne({ where: { id } });
  }

  public async createProduct(product: Product): Promise<Product> {
    return this.repository.save(product);
  }

  public async updateProduct(
    id: number,
    product: Product
  ): Promise<Product | null> {
    await this.repository.update(id, product);
    return this.repository.findOne({ where: { id } });
  }

  public async deleteProduct(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
