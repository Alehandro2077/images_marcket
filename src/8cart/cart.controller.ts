import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddItemDto } from './dto/add-item.dto';
import { RequestWithUser } from 'src/3user/interfaces/user.interface';
import { AuthGuard } from 'src/2auth/guards/auth.guard';
import { Roles } from 'src/2auth/decorators/role.decorator';
import { RolesGuard } from 'src/2auth/guards/role.guard';
import { ApiAddItemToCart, ApiGetCart } from './swagger/decorators';
import { IsOwnerCartImageDeleteGuard } from 'src/2auth/guards/is-owner-cart-image.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiAddItemToCart()
  @Roles(['supplier'])
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  addItem(@Req() req: RequestWithUser, @Body() addItemDto: AddItemDto) {
    return this.cartService.addItem(req.userId, addItemDto);
  }

  @ApiGetCart()
  @Roles(['supplier'])
  @UseGuards(AuthGuard, RolesGuard)
  @Get('')
  getCartOfUser(@Req() req: RequestWithUser) {
    return this.cartService.getCartOfUser(req.userId);
  }

  @Roles(['supplier'])
  @UseGuards(AuthGuard, RolesGuard)
  @Get('/project_cart/:projectId')
  async getCartOfProject(@Req() req: RequestWithUser, @Param('projectId') projectId: string) {
    return this.cartService.getCartOfProject(req.userId, projectId);
  }


  @UseGuards(IsOwnerCartImageDeleteGuard)
  @Delete(':id')
  removeItemFromCart(@Param('id') cartProjectImageId: string) {
    return this.cartService.removeItemFromCart(cartProjectImageId);
  }
}
