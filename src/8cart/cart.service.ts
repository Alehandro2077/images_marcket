import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { AddItemDto } from './dto/add-item.dto';
import { PrismaService } from 'src/1database/prisma.service';
import { FileUploadService } from 'src/6project/uppload.service';

@Injectable()
export class CartService {
  private readonly logger = new Logger(CartService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  private async createCartProject(cartId: string, projectId: string) {
    return await this.prismaService.cartProject.create({
      data: { cartId, projectId },
      include: { cartProjectImage: { include: { image: true } } },
    });
  }

  private async createCartProjectImage(cartProjectId: string, imageId: string) {
    return await this.prismaService.cartProjectImage.create({
      data: { cartProjectId, imageId },
      include: {
        image: {
          select: {
            id: true,
            title: true,
            author: true,
            price: true,
            currency: true,
            thumbnailKey: true,
            thumbnailUrl: true,
          },
        },
      },
    });
  }
  // include: { cartImage: { include: { image: true } } },

  async addItem(userId: string, addItemDto: AddItemDto) {
    try {
      const { imageId, projectId, price } = addItemDto;

      const cart = await this.getCartOfUser(userId);
      console.log('-=-=-=-cart', cart);

      const cartProject = await this.getCartProject(cart.id, projectId);
      console.log('-=-=-=-=-cartProject', cartProject);

      const cartProjectImage = await this.createCartProjectImage(
        cartProject.id,
        imageId,
      );

      await this.prismaService.cartProject.update({
        where: { id: cartProject.id },
        data: { totalPrice: { increment: price } },
      });

      console.log('-=-=-=-=-=cartProjectImage', cartProjectImage);

      const thumbnailUrl = await this.fileUploadService.getSignedUrl(
        cartProjectImage.image.thumbnailKey,
      );

      cartProjectImage.image.thumbnailUrl = thumbnailUrl;

      return cartProjectImage;
    } catch (error) {
      this.logger.error('addItem to cart ', error);

      if (error.name === 'PrismaClientKnownRequestError') {
        throw new HttpException('Bad data.', HttpStatus.BAD_REQUEST);
      }

      throw new HttpException(
        'An error occurred while adding image to cart.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCartProject(cartId: string, projectId: string) {
    const cartProject = await this.prismaService.cartProject.findUnique({
      where: { cartId_projectId: { cartId, projectId } },
    });
    console.log('-=-=-=-=-cartProj in get ', cartProject);

    if (!cartProject) {
      return await this.createCartProject(cartId, projectId);
    }

    return cartProject;
  }

  async getCartOfUser(userId: string) {
    try {
      const cart = await this.prismaService.cart.findUnique({
        where: { userId },
        include: {
          cartProject: {
            select: {
              id: true,
              totalPrice: true,
              currency: true,
              project: { select: { title: true } },
              cartProjectImage: { select: { id: true, image: true } },
            },
          },
        },
      });

      const promisesKey = cart.cartProject.map((cartProj) => {
        if (cartProj.cartProjectImage.length > 0) {
          return Promise.all(
            cartProj.cartProjectImage.map((cartImg) => {
              const key = cartImg.image.thumbnailKey;
              return this.fileUploadService.getSignedUrl(key);
            }),
          );
        }
        return [];
      });

      const thumbnailUrlArr = await Promise.all(promisesKey);
      console.log('-=-=-=-=-=thumbnailUrlArr', thumbnailUrlArr);

      cart.cartProject.forEach((cartProj, i) => {
        cartProj.cartProjectImage.forEach((cartImg, j) => {
          const img = cartImg.image;
          cartImg.image = { ...img, thumbnailUrl: thumbnailUrlArr[i][j] };
        });
      });

      // const resultCartProjects = cart.cartProject.map((cartProj, i) => {
      //   return cartProj.cartProjectImage.map((cartImg, j) => {
      //     const img = cartImg.image;
      //     cartImg.image = { ...img, thumbnailUrl: thumbnailUrlArr[i][j] };
      //   });
      // });

      console.log('-=-=-=-=--resultCartProjects', cart.cartProject);

      return cart;
    } catch (error) {
      this.logger.error('getCartOfUser ', error);

      if (error.name === 'PrismaClientKnownRequestError') {
        throw new HttpException('Bad data.', HttpStatus.BAD_REQUEST);
      }

      throw new HttpException(
        'An error occurred while getting cart of user.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeItemFromCart(cartProjectImageId: string) {
    try {
      const cartProject = await this.prismaService.cartProjectImage.delete({
        where: { id: cartProjectImageId },
        select: { cartProjectId: true, image: { select: { price: true } } },
      });

      console.log('-=-=-=-=-cartProjectId', cartProject);

      await this.prismaService.cartProject.update({
        where: { id: cartProject.cartProjectId },
        data: {
          totalPrice: {
            decrement: cartProject.image.price,
          },
        },
      });
    } catch (error) {
      this.logger.error('removeItemFromCart ', error);

      if (error.name === 'PrismaClientKnownRequestError') {
        throw new HttpException('Bad data.', HttpStatus.BAD_REQUEST);
      }

      throw new HttpException(
        'An error occurred while removing item from cart.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCartOfProject(userId: string, projectId: string) {
    try {
      console.log(projectId);
      if (!projectId.length) {
        throw new BadRequestException();
      }

      const cartId = (
        await this.prismaService.cart.findUnique({
          where: { userId },
          select: { id: true },
        })
      ).id;

      const cartProject = await this.prismaService.cartProject.findUnique({
        where: {
          cartId_projectId: {
            cartId,
            projectId,
          },
        },
      });
      console.log('-=-=-==--=cartProject', cartProject);

      if (!cartProject) {
        console.log('No cart project found for this projectId.');
        return [];
      }

      const result = await this.prismaService.cartProjectImage.findMany({
        where: {
          cartProjectId: cartProject.id,
        },
      });

      console.log('-=-=-=-=-=ressss', result);

      return result;
    } catch (error) {
      this.logger.error('getCartOfProject ', error);

      if (error.name === 'PrismaClientKnownRequestError') {
        throw new HttpException('Bad data.', HttpStatus.BAD_REQUEST);
      }

      throw new HttpException(
        'An error occurred while getting cart of project.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async isImageOfCart(userId: string, cartProjectImageId: string) {
    console.log(
      '-=-=-=-=--in is image of cart cartProjectImageId',
      cartProjectImageId,
    );
    const result = await this.prismaService.cartProjectImage.findUnique({
      where: {
        id: cartProjectImageId,
        cartProject: {
          cart: {
            userId: userId,
          },
        },
      },
      select: {
        id: true,
      },
    });

    console.log('-=-=-=-=-result', result !== null, result);

    return result !== null;
  }
}
