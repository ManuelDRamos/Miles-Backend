import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiBody, ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { PhotosService } from "./photos.service";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";
import { CloudinaryService } from "../cloudinary/cloudinary.service";

@ApiTags("Photos")
@Controller("photos")
export class PhotosController {
  constructor(
    private service: PhotosService,
    private cloudinary: CloudinaryService,
  ) {}

  // 🔥 SUBIR IMAGEN (FIX COMPLETO)
  @Post("upload")
  @ApiBearerAuth("access-token")
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      required: ["file", "categoryId"],
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
        categoryId: {
          type: "string",
        },
        title: {
          type: "string",
        },
        description: {
          type: "string",
        },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor("file", {
      limits: {
        fileSize: 50 * 1024 * 1024, // 👉 50MB (ajusta si quieres)
      },
    }),
  )
  async upload(
    @UploadedFile() file: any,
    @Body()
    body: {
      categoryId: string;
      title?: string;
      description?: string;
    },
  ) {
    if (!file) {
      throw new BadRequestException("No se recibió archivo");
    }

    console.log("FILE NAME:", file.originalname);
    console.log("FILE SIZE:", file.size);
    console.log("PASÓ EL CONTROLLER");

    const result: any = await this.cloudinary.uploadFile(file);

    return this.service.create({
      url: result.secure_url,
      publicId: result.public_id,
      title: body.title,
      description: body.description,
      categoryId: body.categoryId,
    });
  }

  // 🔐 Crear manual
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() body: any) {
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

  // ❌ Eliminar
  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }
}
