import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class SiteContentService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.siteContent.findMany();
  }

  findByKey(key: string) {
    return this.prisma.siteContent.findUnique({
      where: { key },
    });
  }

  upsert(key: string, value: any) {
    return this.prisma.siteContent.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }
}
