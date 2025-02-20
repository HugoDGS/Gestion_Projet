import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProjectDto } from '../projects/dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto, userId: string) {
    return this.prisma.project.create({
      data: {
        ...createProjectDto,
        ownerId: userId, 
      },
    });
  }
  

  async findAll() {
    return this.prisma.project.findMany();
  }

  async findOne(id: string) {
    return this.prisma.project.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateProjectDto: CreateProjectDto) {
    return this.prisma.project.update({
      where: { id },
      data: updateProjectDto,
    });
  }

  async remove(id: string) {
    return this.prisma.project.delete({
      where: { id },
    });
  }
}
