import { Container } from "inversify";
import { ProductService } from "../services/ProductService";
import { ProductController } from "../controllers/ProductController";
import { AppDataSource } from "../config/db";
import { UserService } from "../services/UserService";
import { AuthController } from "../controllers/AuthController";

const container = new Container();

const initializeContainer = async () => {
  await AppDataSource.initialize();
  container.bind<ProductService>(ProductService).toSelf();
  container.bind<ProductController>(ProductController).toSelf();
  container.bind<UserService>(UserService).toSelf();
  container.bind<AuthController>(AuthController).toSelf();
  return container;
};

export { initializeContainer };
