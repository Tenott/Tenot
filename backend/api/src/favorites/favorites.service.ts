import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  add(buyerId: number, listingId: number) {
    return this.prisma.favorite.upsert({
      where: { buyerId_listingId: { buyerId, listingId } },
      create: { buyerId, listingId },
      update: {},
    });
  }

  remove(buyerId: number, listingId: number) {
    return this.prisma.favorite.deleteMany({ where: { buyerId, listingId } });
  }

  getAll(buyerId: number) {
    return this.prisma.favorite.findMany({
      where: { buyerId },
      include: { listing: { include: { images: true, category: true } } },
      orderBy: { id: 'desc' },
    });
  }
}
