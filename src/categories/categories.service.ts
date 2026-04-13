import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  // 🔥 Crear categoría
  async create(data: {
    name: string;
    description?: string;
    coverImage?: string;
  }) {
    const slug = data.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

    return this.prisma.category.create({
      data: {
        name: data.name,
        slug,
        description: data.description,
        coverImage: data.coverImage,
      },
    });
  }

  // 📂 Listar solo activas (para frontend)
  findAll() {
    return this.prisma.category.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });
  }

  // 📂 Obtener una
  findOne(id: string) {
    return this.prisma.category.findUnique({
      where: { id },
    });
  }

  // ✏️ Actualizar
  update(
    id: string,
    data: {
      name?: string;
      description?: string;
      coverImage?: string;
      isActive?: boolean;
      order?: number;
    },
  ) {
    return this.prisma.category.update({
      where: { id },
      data,
    });
  }

  // ❌ Eliminación lógica (mejor práctica)
  remove(id: string) {
    return this.prisma.category.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
