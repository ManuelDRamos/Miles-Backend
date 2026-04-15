import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // 🔥 REGEX
  private emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  private passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  // ✅ Validar usuario
  async validateUser(email: string, password: string) {
    // 🔒 SOLO ADMIN
    if (email !== process.env.ADMIN_EMAIL) {
      throw new UnauthorizedException("No autorizado");
    }

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return user;
  }

  // ✅ REGISTER
  async register(email: string, password: string) {
    // 🔒 VALIDAR EMAIL
    if (!this.emailRegex.test(email)) {
      throw new UnauthorizedException("Email inválido");
    }

    // 🔒 VALIDAR PASSWORD
    if (!this.passwordRegex.test(password)) {
      throw new UnauthorizedException(
        "La contraseña debe tener mínimo 8 caracteres, mayúscula, minúscula, número y símbolo",
      );
    }

    // 🔥 SOLO PERMITIR UN USUARIO
    const existingAnyUser = await this.prisma.user.findFirst();

    if (existingAnyUser) {
      throw new UnauthorizedException("Registro deshabilitado");
    }

    // 🔒 SOLO ADMIN EMAIL
    if (email !== process.env.ADMIN_EMAIL) {
      throw new UnauthorizedException("No autorizado");
    }

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new UnauthorizedException("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return {
      message: "User created successfully",
      user,
    };
  }

  // ✅ LOGIN
  async login(email: string, password: string) {
    // 🔒 SOLO ADMIN
    if (email !== process.env.ADMIN_EMAIL) {
      throw new UnauthorizedException("No autorizado");
    }

    const user = await this.validateUser(email, password);

    const payload = {
      sub: user.id,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
