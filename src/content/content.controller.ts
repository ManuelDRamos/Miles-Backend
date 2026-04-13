import { Controller, Get, Patch, Param, Body, UseGuards } from "@nestjs/common";
import { ContentService } from "./content.service";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";

@Controller("admin/content")
export class ContentController {
  constructor(private service: ContentService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.service.findAll();
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  update(@Param("id") id: string, @Body() body: any) {
    return this.service.update(id, body);
  }
}
