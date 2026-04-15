import {
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Put,
  Body,
  UseGuards,
} from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Categories")
@Controller("categories")
export class CategoriesController {
  constructor(private service: CategoriesService) {}

  // 🔐 Crear categoría
  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body()
    body: {
      name: string;
      description?: string;
      coverImage?: string;
    },
  ) {
    return this.service.create(body);
  }

  // 📂 Listar
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // 📂 Obtener una
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.service.findOne(id);
  }

  // ✏️ Actualizar
  @Put(":id")
  @UseGuards(JwtAuthGuard)
  update(
    @Param("id") id: string,
    @Body()
    body: {
      name?: string;
      description?: string;
      coverImage?: string;
      isActive?: boolean;
      order?: number;
    },
  ) {
    return this.service.update(id, body);
  }

  // ❌ Desactivar
  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }
}
