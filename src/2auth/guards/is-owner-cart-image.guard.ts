import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ProjectService } from 'src/6project/project.service';
import { CartService } from 'src/8cart/cart.service';

@Injectable()
export class IsOwnerCartImageDeleteGuard implements CanActivate {
  constructor(private readonly cartService: CartService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.userId;

    let cartProjectImageId = request.params.id;

    if (typeof cartProjectImageId !== 'string') {
      throw new ForbiddenException('Invalid query parameters.');
    }
    try {
      const isCartImageOwner = await this.cartService.isImageOfCart(
        userId,
        cartProjectImageId,
      );

      if (!isCartImageOwner) {
        throw new ForbiddenException(
          'The item does not belong to the user cart.',
        );
      }
    } catch (error) {
      throw new ForbiddenException(
        'The item does not belong to the user cart.',
      );
    }

    return true;
  }
}
