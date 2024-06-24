import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import * as bodyParser from "body-parser";
import { initializeContainer } from "./middleware/container";
import "./controllers/ProductController";
import "./controllers/AuthController";
import * as dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../swagger.json";
import basicAuth from "express-basic-auth";
import cors from "cors";

dotenv.config();

const startServer = async () => {
  try {
    const port = process.env.APP_PORT || 3000;
    const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;
    const swaggerUsername = process.env.SWAGGER_USERNAME || "admin";
    const swaggerPassword = process.env.SWAGGER_PASSWORD || "password";

    const container = await initializeContainer();

    const server = new InversifyExpressServer(container);

    const swaggerDoc = JSON.parse(JSON.stringify(swaggerDocument));

    swaggerDoc.servers = [
      {
        url: baseUrl,
        description: "Dynamic server URL",
      },
    ];

    server.setConfig((app) => {
      app.use(bodyParser.json());

      app.use(
        cors({
          methods: ["GET", "POST", "PUT", "DELETE"],
        })
      );

      app.use(
        "/api-docs",
        basicAuth({
          users: { [swaggerUsername]: swaggerPassword },
          challenge: true,
        })
      );

      app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
    });

    const app = server.build();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log(`Swagger docs available at ${baseUrl}/api-docs`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();
