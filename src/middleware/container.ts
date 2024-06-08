import { Container } from "inversify";
import { ProductService } from "../services/ProductService";
import { ProductController } from "../controllers/ProductController";
import { AppDataSource } from "../config/db";

const container = new Container();

const initializeContainer = async () => {
  await AppDataSource.initialize();
  container.bind<ProductService>(ProductService).toSelf();
  container.bind<ProductController>(ProductController).toSelf();
  return container;
};

export { initializeContainer };
