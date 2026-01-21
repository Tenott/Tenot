import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  create(name: string) {
    return this.prisma.category.create({ data: { name } });
  }

  findAll() {
    return this.prisma.category.findMany({ orderBy: { name: 'asc' } });
  }

  remove(id: number) {
    return this.prisma.category.delete({ where: { id } });
  }
}
