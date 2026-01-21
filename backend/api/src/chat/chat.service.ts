import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto.create-message';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async sendMessage(sender: { userId: number; role: string }, dto: CreateMessageDto) {
    const listing = await this.prisma.listing.findUnique({ where: { id: dto.listingId }, include: { supplier: true } });
    if (!listing) throw new NotFoundException('Listing not found');

    // Resolve buyer/supplier ids based on sender role
    let buyerId: number;
    let supplierUserId: number;

    if (sender.role === 'BUYER') {
      buyerId = sender.userId;
      supplierUserId = dto.receiverId;
      // sanity check receiver is listing owner
      if (listing.supplier.userId !== supplierUserId) {
        throw new BadRequestException('Receiver must be listing supplier');
      }
    } else if (sender.role === 'SUPPLIER') {
      supplierUserId = sender.userId;
      buyerId = dto.receiverId;
      // sanity check sender owns listing
      if (listing.supplier.userId !== supplierUserId) {
        throw new BadRequestException('You are not the supplier of this listing');
      }
    } else {
      throw new BadRequestException('Admins do not use chat');
    }

    let chat = await this.prisma.chat.findFirst({
      where: { listingId: dto.listingId, buyerId, supplierId: supplierUserId },
    });

    if (!chat) {
      chat = await this.prisma.chat.create({
        data: { listingId: dto.listingId, buyerId, supplierId: supplierUserId },
      });
    }

    return this.prisma.message.create({
      data: { chatId: chat.id, senderId: sender.userId, text: dto.text },
    });
  }

  getChats(userId: number) {
    return this.prisma.chat.findMany({
      where: { OR: [{ buyerId: userId }, { supplierId: userId }] },
      include: {
        messages: { orderBy: { createdAt: 'asc' } },
      },
      orderBy: { id: 'desc' },
    });
  }

  getMessages(chatId: number, userId: number) {
    return this.prisma.message.findMany({
      where: {
        chatId,
        chat: { OR: [{ buyerId: userId }, { supplierId: userId }] },
      },
      orderBy: { createdAt: 'asc' },
    });
  }
}
