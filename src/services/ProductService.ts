import { injectable } from "inversify";
import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories/ProductRepository";
import { AppDataSource } from "../config/db";

@injectable()
export class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository(AppDataSource);
  }

  public async getAllProducts(): Promise<Product[]> {
    return this.productRepository.getAllProducts();
  }

  public async getProductById(id: number): Promise<Product | null> {
    return this.productRepository.getProductById(id);
  }

  public async createProduct(product: Product): Promise<Product> {
    return this.productRepository.createProduct(product);
  }

  public async updateProduct(
    id: number,
    product: Product
  ): Promise<Product | null> {
    return this.productRepository.updateProduct(id, product);
  }

  public async deleteProduct(id: number): Promise<void> {
    await this.productRepository.deleteProduct(id);
  }

  public async loadCatalog(products: Product[]): Promise<void> {
    for (const product of products) {
      const existingProduct = await this.productRepository.getProductById(
        product.id as number
      );
      if (!existingProduct) {
        await this.productRepository.createProduct(product);
      }
    }
  }
}
