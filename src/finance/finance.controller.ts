import { Controller, Get, Post, Body, UseGuards } from "@nestjs/common";
import { FinancesService } from "./finance.service";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";

@Controller("admin/finances")
export class FinancesController {
  constructor(private service: FinancesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.service.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() body: any) {
    return this.service.create(body);
  }

  @Get("summary")
  @UseGuards(JwtAuthGuard)
  summary() {
    return this.service.summary();
  }
}
