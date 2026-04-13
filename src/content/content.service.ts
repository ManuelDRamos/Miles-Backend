import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.siteContent.findMany();
  }

  update(id: string, data: any) {
    return this.prisma.siteContent.update({
      where: { id },
      data: {
        key: data.section,
        value: {
          title: data.title,
          text: data.text,
          imageUrl: data.imageUrl,
        },
      },
    });
  }
}
