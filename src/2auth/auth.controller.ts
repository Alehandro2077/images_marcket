import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  Res,
  UseGuards,
  Get,
  Req,
  HttpException,
} from '@nestjs/common';
import { Response, Request } from 'express';

import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import {
  ACCESS_TOKEN_OPTIONS,
  REFRESH_TOKEN_OPTIONS,
} from 'src/0common/constants';
import { AuthGuard } from './guards/auth.guard';
import { RequestWithUser } from 'src/3user/interfaces/user.interface';
import { UserService } from 'src/3user/user.service';

@Controller('auth')
export class AuthController {
  private readonly accessTokenOptions: object = ACCESS_TOKEN_OPTIONS;
  private readonly refreshTokenOptions: object = REFRESH_TOKEN_OPTIONS;

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('sign-up')
  async signUp(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.signUp(signUpDto);
    const tokens = this.authService.generateTokens(user.id);

    response.cookie('accessToken', tokens.accessToken, this.accessTokenOptions);

    response.cookie(
      'refreshToken',
      tokens.refreshToken,
      this.refreshTokenOptions,
    );
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.signIn(signInDto);
    const tokens = this.authService.generateTokens(user.id);

    response.cookie('accessToken', tokens.accessToken, this.accessTokenOptions);

    response.cookie(
      'refreshToken',
      tokens.refreshToken,
      this.refreshTokenOptions,
    );
    return user;
  }

  // @ApiAuthenticate()
  @UseGuards(AuthGuard)
  @Get('me')
  async authenticate(@Req() request: RequestWithUser) {
    return this.userService.getFullUserInfo(request.userId);
  }

  @Get('refresh')
  refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies.refreshToken;

    if (!refreshToken) {
      throw new HttpException(
        'Refresh token does not exist',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const accessToken = this.authService.refresh(refreshToken);

    response.clearCookie('accessToken', this.refreshTokenOptions);

    response.cookie('accessToken', accessToken, this.accessTokenOptions);

    return;
  }

  // @ApiSignOut()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('sign-out')
  logOut(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('refreshToken', this.accessTokenOptions);
    response.clearCookie('accessToken', this.refreshTokenOptions);

    return;
  }
}
