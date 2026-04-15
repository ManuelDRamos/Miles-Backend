import { Module } from "@nestjs/common";
import { PhotosService } from "./photos.service";
import { PhotosController } from "./photos.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { CloudinaryModule } from "../cloudinary/cloudinary.module";

@Module({
  imports: [PrismaModule, CloudinaryModule],
  controllers: [PhotosController],
  providers: [PhotosService],
})
export class PhotosModule {}
