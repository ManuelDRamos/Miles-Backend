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
import { FinancesService } from "./finance.service";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Finances")
@Controller("admin/finances")
export class FinancesController {
  constructor(private service: FinancesService) {}

  // 📂 Listar
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.service.findAll();
  }

  // ➕ Crear
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() body: any) {
    return this.service.create(body);
  }

  // ✏️ Actualizar
  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  update(@Param("id") id: string, @Body() body: any) {
    return this.service.update(id, body);
  }

  // ❌ Eliminar
  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }

  // 📊 🔥 RESUMEN
  @Get("summary")
  @UseGuards(JwtAuthGuard)
  getSummary() {
    return this.service.getSummary();
  }
}
