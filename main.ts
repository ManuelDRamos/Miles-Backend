import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import * as express from "express";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔥 LÍMITES REALES PARA REQUESTS GRANDES (VIDEOS / IMÁGENES)
  app.use(express.json({ limit: "100mb" }));
  app.use(express.urlencoded({ limit: "100mb", extended: true }));

  // 🔥 TIMEOUT (IMPORTANTE PARA VIDEOS PESADOS)
  app.use((req, res, next) => {
    req.setTimeout(10 * 60 * 1000); // 10 minutos
    res.setTimeout(10 * 60 * 1000);
    next();
  });

  app.enableCors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle("Miles API")
    .setDescription("API profesional para fotógrafo SaaS")
    .setVersion("1.0.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
      "access-token",
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}

bootstrap();
