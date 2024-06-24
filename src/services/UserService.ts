import { injectable } from "inversify";
import { Repository } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from "../config/db";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

@injectable()
export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  public async register(email: string, password: string): Promise<User> {
    const existingUser = await this.userRepository.findOneBy({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
    });
    await this.userRepository.save(user);
    return user;
  }

  public async login(email: string, password: string): Promise<string | null> {
    const user = await this.userRepository.findOneBy({ email });
    if (user && (await bcrypt.compare(password, user.password as string))) {
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
      );
      return token;
    }
    return null;
  }
}
