import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PhotosService {
  constructor(private prisma: PrismaService) {}

  create(data: { url: string; title?: string; categoryId: string }) {
    return this.prisma.photo.create({
      data,
    });
  }

  findAll() {
    return this.prisma.photo.findMany({
      where: { isActive: true },
      include: { category: true },
      orderBy: { order: "asc" },
    });
  }

  findByCategory(categoryId: string) {
    return this.prisma.photo.findMany({
      where: {
        categoryId,
        isActive: true,
      },
      orderBy: { order: "asc" },
    });
  }

  update(id: string, data: any) {
    return this.prisma.photo.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.photo.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
