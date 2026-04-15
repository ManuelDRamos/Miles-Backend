import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from "@nestjs/common";
import { PlansService } from "./plans.service";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";

@Controller("admin/plans")
export class PlansController {
  constructor(private service: PlansService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() body: any) {
    return this.service.create(body);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  update(@Param("id") id: string, @Body() body: any) {
    return this.service.update(id, body);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }
}
