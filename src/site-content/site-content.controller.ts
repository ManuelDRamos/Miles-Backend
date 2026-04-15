import { Controller, Get, Patch, Param, Body, UseGuards } from "@nestjs/common";
import { SiteContentService } from "./site-content.service";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";

@Controller("admin/site-content")
export class SiteContentController {
  constructor(private service: SiteContentService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(":key")
  findByKey(@Param("key") key: string) {
    return this.service.findByKey(key);
  }

  @Patch(":key")
  @UseGuards(JwtAuthGuard)
  update(@Param("key") key: string, @Body() body: any) {
    return this.service.upsert(key, body);
  }
}
