import {
  controller,
  httpGet,
  httpPost,
  httpPut,
  httpDelete,
  requestParam,
  requestBody,
} from "inversify-express-utils";
import { ProductService } from "../services/ProductService";
import { Product } from "../entities/Product";
import { inject } from "inversify";
import { Request, Response } from "express";
import logger from "../utils/logger";

@controller("/products")
export class ProductController {
  constructor(@inject(ProductService) private productService: ProductService) {}

  @httpGet("/")
  public async getAll(req: Request, res: Response): Promise<void> {
    logger.info("GET /products");
    try {
      const products = await this.productService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      logger.error(`GET /products - Error: ${(error as Error).message}`);
      res.status(500).json({
        message: "An error occurred",
        error: (error as Error).message,
      });
    }
  }

  @httpGet("/:id")
  public async getById(
    @requestParam("id") id: number,
    req: Request,
    res: Response
  ): Promise<void> {
    logger.info(`GET /products/${id}`);
    try {
      const product = await this.productService.getProductById(id);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      logger.error(`GET /products/${id} - Error: ${(error as Error).message}`);
      res.status(500).json({
        message: "An error occurred",
        error: (error as Error).message,
      });
    }
  }

  @httpPost("/")
  public async create(
    @requestBody() product: Product,
    req: Request,
    res: Response
  ): Promise<void> {
    logger.info("POST /products");
    try {
      const newProduct = await this.productService.createProduct(product);
      res.status(201).json(newProduct);
    } catch (error) {
      logger.error(`POST /products - Error: ${(error as Error).message}`);
      res.status(500).json({
        message: "An error occurred",
        error: (error as Error).message,
      });
    }
  }

  @httpPut("/:id")
  public async update(
    @requestParam("id") id: number,
    @requestBody() product: Product,
    req: Request,
    res: Response
  ): Promise<void> {
    logger.info(`PUT /products/${id}`);
    try {
      const updatedProduct = await this.productService.updateProduct(
        id,
        product
      );
      if (updatedProduct) {
        res.status(200).json(updatedProduct);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      logger.error(`PUT /products/${id} - Error: ${(error as Error).message}`);
      res.status(500).json({
        message: "An error occurred",
        error: (error as Error).message,
      });
    }
  }

  @httpDelete("/:id")
  public async delete(
    @requestParam("id") id: number,
    req: Request,
    res: Response
  ): Promise<void> {
    logger.info(`DELETE /products/${id}`);
    try {
      await this.productService.deleteProduct(id);
      res.status(204).send();
    } catch (error) {
      logger.error(
        `DELETE /products/${id} - Error: ${(error as Error).message}`
      );
      res.status(500).json({
        message: "An error occurred",
        error: (error as Error).message,
      });
    }
  }

  @httpPost("/load_catalog")
  public async loadCatalog(
    @requestBody() products: Product[],
    req: Request,
    res: Response
  ): Promise<void> {
    logger.info("POST /products/load_catalog");
    try {
      await this.productService.loadCatalog(products);
      res.status(200).json({ message: "Catalog loaded successfully" });
    } catch (error) {
      logger.error(
        `POST /products/load_catalog - Error: ${(error as Error).message}`
      );
      res.status(500).json({
        message: "An error occurred",
        error: (error as Error).message,
      });
    }
  }
}
