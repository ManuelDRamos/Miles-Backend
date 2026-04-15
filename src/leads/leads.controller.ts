import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  UseGuards,
} from "@nestjs/common";
import { LeadsService } from "./leads.service";
import { LeadStatus } from "@prisma/client";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Leads")
@Controller()
export class LeadsController {
  constructor(private service: LeadsService) {}

  // 🌐 PUBLIC
  @Post("contact")
  create(@Body() body: any) {
    return this.service.create(body);
  }

  // 🔐 ADMIN
  @Get("admin/leads")
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.service.findAll();
  }

  @Patch("admin/leads/:id")
  @UseGuards(JwtAuthGuard)
  update(@Param("id") id: string, @Body() body: { status: LeadStatus }) {
    return this.service.update(id, body.status);
  }
}
