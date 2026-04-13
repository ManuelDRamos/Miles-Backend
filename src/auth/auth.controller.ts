import { Controller, Post, Body, Get, UseGuards, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt/jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  // ✅ REGISTER
  @Post("register")
  register(@Body() body: { email: string; password: string }) {
    return this.authService.register(body.email, body.password);
  }

  // ✅ LOGIN
  @Post("login")
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  // 🔐 PROTECTED ROUTE
  @Get("profile")
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req) {
    return {
      message: "Access granted",
      user: req.user,
    };
  }
}
