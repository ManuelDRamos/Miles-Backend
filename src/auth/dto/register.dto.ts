import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength, Matches } from "class-validator";

export class RegisterDto {
  @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  @ApiProperty({ example: "test@test.com" })
  @IsEmail()
  email: string;

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
    message:
      "La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un símbolo",
  })
  @ApiProperty({ example: "123456" })
  @IsString()
  @MinLength(6)
  password: string;
}
