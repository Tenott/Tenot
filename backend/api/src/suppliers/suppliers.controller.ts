import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { Roles } from '../auth/roles.decorator';
import { UpsertSupplierProfileDto } from './dto.upsert-profile';

@Controller('supplier')
@Roles('SUPPLIER')
export class SuppliersController {
  constructor(private service: SuppliersService) {}

  @Get('me')
  me(@Req() req: any) {
    return this.service.getMyProfile(req.user.userId);
  }

  @Post('me')
  upsert(@Req() req: any, @Body() dto: UpsertSupplierProfileDto) {
    return this.service.upsertMyProfile(req.user.userId, dto);
  }
}
