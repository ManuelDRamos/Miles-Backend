import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { PhotosService } from "./photos.service";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";

@Controller("photos")
export class PhotosController {
  constructor(private service: PhotosService) {}

  // 🔐 Crear foto
  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body()
    body: {
      url: string;
      title?: string;
      categoryId: string;
    },
  ) {
    return this.service.create(body);
  }

  // 📂 Todas las fotos
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // 📂 Por categoría
  @Get("category/:categoryId")
  findByCategory(@Param("categoryId") categoryId: string) {
    return this.service.findByCategory(categoryId);
  }

  // ✏️ Actualizar
  @Put(":id")
  @UseGuards(JwtAuthGuard)
  update(@Param("id") id: string, @Body() body: any) {
    return this.service.update(id, body);
  }

  // ❌ Eliminar (soft)
  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }
}
