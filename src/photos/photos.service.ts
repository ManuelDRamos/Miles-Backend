import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CloudinaryService } from "../cloudinary/cloudinary.service"; // ✅ agregado

@Injectable()
export class PhotosService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService, // ✅ agregado
  ) {}

  create(data: {
    url: string;
    publicId?: string; // ✅ agregado
    title?: string;
    description?: string;
    categoryId: string;
  }) {
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

  async remove(id: string) {
    const photo = await this.prisma.photo.findUnique({
      where: { id },
    });

    // 🔥 eliminar en cloudinary si existe publicId
    if (photo?.publicId) {
      await this.cloudinary.deleteFile(photo.publicId);
    }

    // 🔥 soft delete (como ya lo tienes)
    return this.prisma.photo.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
