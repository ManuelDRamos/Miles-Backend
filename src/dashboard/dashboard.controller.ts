import { Controller, Get, UseGuards } from "@nestjs/common";
import { DashboardService } from "./dashboard.service";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";

@Controller("admin/dashboard")
export class DashboardController {
  constructor(private service: DashboardService) {}

  @Get("stats")
  @UseGuards(JwtAuthGuard)
  stats() {
    return this.service.stats();
  }
}
