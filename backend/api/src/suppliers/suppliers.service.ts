import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpsertSupplierProfileDto } from './dto.upsert-profile';

@Injectable()
export class SuppliersService {
  constructor(private prisma: PrismaService) {}

  getMyProfile(userId: number) {
    return this.prisma.supplierProfile.findUnique({ where: { userId } });
  }

  upsertMyProfile(userId: number, dto: UpsertSupplierProfileDto) {
    return this.prisma.supplierProfile.upsert({
      where: { userId },
      create: { userId, ...dto },
      update: { ...dto },
    });
  }
}
