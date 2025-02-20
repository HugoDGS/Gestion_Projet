import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [AuthModule, ProjectsService, PrismaService], 
  controllers: [ProjectsController],
  exports: [ProjectsService],
})
export class ProjectsModule {}
