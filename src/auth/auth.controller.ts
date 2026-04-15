import { Controller, Post, Body, Get, UseGuards, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt/jwt-auth.guard";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  // ✅ REGISTER
  @Post("register")
  register(@Body() body: RegisterDto) {
    return this.authService.register(body.email, body.password);
  }

  // ✅ LOGIN
  @Post("login")
  login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }

  // 🔐 PROTECTED ROUTE
  @Get("profile")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req) {
    return {
      message: "Access granted",
      user: req.user,
    };
  }
}
