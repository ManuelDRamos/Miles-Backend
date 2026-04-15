import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
  Query, // ✅ agregado
} from "@nestjs/common";
import { BookingsService } from "./bookings.service";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Bookings")
@Controller("admin/bookings")
export class BookingsController {
  constructor(private service: BookingsService) {}

  // 📂 Todas las reservas
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.service.findAll();
  }

  // 📅 Reservas por mes (🔥 CALENDARIO)
  @Get("month")
  @UseGuards(JwtAuthGuard)
  getByMonth(@Query("month") month: string) {
    return this.service.getByMonth(month);
  }

  // 📅 Próximas reservas (🔥 PANEL DERECHO)
  @Get("upcoming")
  @UseGuards(JwtAuthGuard)
  getUpcoming() {
    return this.service.getUpcoming();
  }

  // ➕ Crear reserva
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() body: any) {
    return this.service.create(body);
  }

  // ✏️ Actualizar reserva
  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  update(@Param("id") id: string, @Body() body: any) {
    return this.service.update(id, body);
  }

  // ✅ Confirmar reserva (🔥 BOTÓN UI)
  @Patch(":id/confirm")
  @UseGuards(JwtAuthGuard)
  confirm(@Param("id") id: string) {
    return this.service.confirm(id);
  }

  @Patch(":id/cancel")
  @UseGuards(JwtAuthGuard)
  cancel(@Param("id") id: string) {
    return this.service.cancel(id);
  }
}
