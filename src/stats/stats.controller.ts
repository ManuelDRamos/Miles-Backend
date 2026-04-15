import { Controller, Get, UseGuards } from "@nestjs/common";
import { StatsService } from "./stats.service";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";

@Controller("admin/stats")
export class StatsController {
  constructor(private service: StatsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getStats() {
    return this.service.getStats();
  }
}
