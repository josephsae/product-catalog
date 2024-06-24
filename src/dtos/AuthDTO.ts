import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class RegisterDTO {
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @IsNotEmpty()
  @Length(6, 20)
  password?: string;
}

export class LoginDTO {
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @IsNotEmpty()
  password?: string;
}
