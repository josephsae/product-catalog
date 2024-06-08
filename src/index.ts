import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import * as bodyParser from "body-parser";
import { initializeContainer } from "./middleware/container";
import "./controllers/ProductController";
import * as dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../swagger.json";

dotenv.config();

const startServer = async () => {
  try {
    const container = await initializeContainer();

    const server = new InversifyExpressServer(container);

    server.setConfig((app) => {
      app.use(bodyParser.json());

      app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    });

    const app = server.build();
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
      console.log("Swagger docs available at http://localhost:3000/api-docs");
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();
