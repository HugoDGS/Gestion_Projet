import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';  
import { PrismaService } from './prisma.service'; 
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AuthModule, ProjectsModule, TasksModule],
  controllers: [AppController],
  providers: [PrismaService,AppService],
})
export class AppModule {}
