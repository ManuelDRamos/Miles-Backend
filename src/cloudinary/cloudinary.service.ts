import { Injectable } from "@nestjs/common";
import cloudinary from "./cloudinary.config";
import sharp from "sharp";

@Injectable()
export class CloudinaryService {
  async uploadFile(file: any) {
    if (!file) {
      throw new Error("Archivo inválido o vacío");
    }

    // 🔥 1. COMPRIMIR IMAGEN ANTES DE SUBIR
    let buffer = file.buffer;

    // Solo procesar imágenes (no videos)
    if (file.mimetype.startsWith("image/")) {
      buffer = await sharp(file.buffer)
        .resize({
          width: 1920, // 🔥 tamaño máximo
          withoutEnlargement: true,
        })
        .jpeg({
          quality: 75, // 🔥 compresión fuerte pero buena calidad
        })
        .toBuffer();
    }

    // 🔥 2. SUBIR A CLOUDINARY DESDE BUFFER
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: "fotografo",
          quality: "auto",
          fetch_format: "auto",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      stream.end(buffer);
    });
  }

  async deleteFile(publicId: string) {
    return cloudinary.uploader.destroy(publicId);
  }
}
