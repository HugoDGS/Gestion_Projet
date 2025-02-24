import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Ajouter la configuration CORS pour permettre les requêtes depuis React
  app.enableCors({
    origin: 'http://localhost:5173', // Assure-toi que l'URL de ton frontend est correcte
    methods: ['GET', 'POST'], // Autorise GET et POST
    allowedHeaders: ['Content-Type', 'Authorization'], // Autorise les en-têtes nécessaires
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
