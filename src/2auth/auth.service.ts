import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { SignUpDto } from './dto/sign-up.dto';
import { PrismaService } from 'src/1database/prisma.service';
import { UserService } from 'src/3user/user.service';
import { CreatorService } from 'src/4creator/creator.service';
import { SupplierService } from 'src/5supplier/supplier.service';
import { IUser } from 'src/3user/interfaces/user.interface';
import { MyPrismaErrors } from 'src/1database/error-codes/prismaError';
import { SignInDto } from './dto/sign-in.dto';
import { formatUserData } from 'src/3user/helpers/format-user';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  private readonly jwtAccessSecret: string = process.env.JWT_ACCESS_SECRET;
  private readonly jwtRefreshSecret: string = process.env.JWT_REFRESH_SECRET;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly creatorService: CreatorService,
    private readonly supplierService: SupplierService,
    private readonly jwtService: JwtService,
  ) {
    // @InjectModel(AuthUser) private readonly authRepository: typeof AuthUser, // @Inject(CACHE_MANAGER) private cacheManager: Cache,
    // private readonly userService: UserService,
    // private readonly esendexService: EsendexService,
    // private readonly emailService: EmailService,
    // private readonly jwtService: JwtService,
    // private sequelize: Sequelize,
  }

  async signUp(signUpDto: SignUpDto) {
    try {
      const { userData, role, creatorData, supplierData } = signUpDto;

      userData.password = await bcrypt.hash(userData.password, 10);

      const user = await this.prismaService.$transaction(
        async (transactionClient) => {
          const roleDb = await transactionClient.role.findUnique({
            where: { role },
          });
          const user: IUser = await this.userService.create(
            userData,
            roleDb.id,
            transactionClient,
          );

          if (role === 'creator') {
            user.creatorData = await this.creatorService.create(
              user.id,
              creatorData,
              transactionClient,
            );
          } else if (role === 'supplier')
            user.supplierData = await this.supplierService.create(
              user.id,
              supplierData,
              transactionClient,
            );
          return user;
        },
      );
      return user;
    } catch (error) {
      this.logger.error(error);

      if (error.name === 'PrismaClientValidationError') {
        throw new HttpException(
          'Data validation error',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (error?.code === MyPrismaErrors.UniqueViolation) {
        throw new HttpException(
          'User with that email can not be created',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (error.status === HttpStatus.BAD_REQUEST) {
        throw new HttpException(error.message, error.status);
      }

      throw new HttpException(
        'An error occurred while sign up.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async signIn(signInDto: SignInDto) {
    try {
      const { email, password } = signInDto;

      const userDb = await this.prismaService.user.findUnique({
        where: { email },
        include: {
          role: { select: { role: true } },
          creatorData: true,
          supplierData: true,
        },
      });

      if (!userDb) {
        throw new HttpException('Unauthorized.', HttpStatus.UNAUTHORIZED);
      }

      const isAuth = await bcrypt.compare(password, userDb.password);

      if (!isAuth) {
        throw new HttpException('Unauthorized.', HttpStatus.UNAUTHORIZED);
      }

      const user = formatUserData(userDb, userDb.role.role);

      return user;
    } catch (error) {
      this.logger.error(error);
      if (error.status === HttpStatus.UNAUTHORIZED) {
        throw new HttpException(error.message, error.status);
      }

      throw new HttpException(
        'An error occurred while sign in.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  generateTokens(id: string) {
    const accessToken = this.jwtService.sign(
      { id },
      { expiresIn: '1h', secret: this.jwtAccessSecret },
    );
    const refreshToken = this.jwtService.sign(
      { id },
      { expiresIn: '24h', secret: this.jwtRefreshSecret },
    );
    return { accessToken, refreshToken };
  }

  refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.jwtRefreshSecret,
      });
      const id = payload.id;
      const accessToken = this.jwtService.sign(
        { id },
        { expiresIn: '1h', secret: this.jwtAccessSecret },
      );

      return accessToken;
    } catch (error) {
      throw new HttpException('Token was not verify', HttpStatus.UNAUTHORIZED);
    }
  }

  async isUserExist(userId) {
    try {
      const isUser = await this.prismaService.user.findUnique({
        where: { id: userId },
        select: { id: true, role: true },
      });

      return isUser;
    } catch (error) {
      if (error.name === 'PrismaClientKnownRequestError') {
        throw new HttpException('Bad data.', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'An error occurred while check user.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
