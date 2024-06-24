import { controller, httpPost, requestBody } from "inversify-express-utils";
import { UserService } from "../services/UserService";
import { inject } from "inversify";
import { Request, Response } from "express";
import { RegisterDTO, LoginDTO } from "../dtos/AuthDTO";
import { validationMiddleware } from "../middleware/validate";
import logger from "../utils/logger";

@controller("/auth")
export class AuthController {
  constructor(@inject(UserService) private userService: UserService) {}

  @httpPost("/register", validationMiddleware(RegisterDTO))
  public async register(
    @requestBody() body: RegisterDTO,
    res: Response
  ): Promise<void> {
    logger.info("POST /auth/register");
    const { email, password } = body;
    try {
      const user = await this.userService.register(
        email as string,
        password as string
      );
      res.status(201).json(user);
    } catch (error) {
      logger.error(`POST /auth/register - Error: ${(error as Error).message}`);
      if ((error as Error).message === "User already exists") {
        res.status(400).json({
          message: "User already exists",
          error: (error as Error).message,
        });
      } else {
        res.status(500).json({
          message: "An error occurred",
          error: (error as Error).message,
        });
      }
    }
  }

  @httpPost("/login", validationMiddleware(LoginDTO))
  public async login(
    @requestBody() body: LoginDTO,
    req: Request,
    res: Response
  ): Promise<void> {
    logger.info("POST /auth/login");
    const { email, password } = body;
    try {
      const token = await this.userService.login(
        email as string,
        password as string
      );
      if (token) {
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      logger.error(`POST /auth/login - Error: ${(error as Error).message}`);
      res.status(500).json({
        message: "An error occurred",
        error: (error as Error).message,
      });
    }
  }
}
