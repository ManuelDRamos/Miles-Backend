import { Controller, Get, Patch, Param, Body, UseGuards } from "@nestjs/common";
import { SettingsService } from "./settings.service";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";

@Controller("admin/settings")
export class SettingsController {
  constructor(private service: SettingsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Patch(":key")
  @UseGuards(JwtAuthGuard)
  update(@Param("key") key: string, @Body() body: any) {
    return this.service.upsert(key, body);
  }
}
