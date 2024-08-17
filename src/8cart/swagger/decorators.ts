import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { AddItemToCartExample, GetCartExample } from './examples';

export function ApiGetCart() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary: 'Return cart of supplier.',
    }),

    ApiOkResponse({
      status: HttpStatus.OK,
      schema: {
        example: GetCartExample,
      },
    }),
  );
}

export function ApiAddItemToCart() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary: 'Add image to cart with project tab.',
      description: '',
    }),

    ApiOkResponse({
      status: HttpStatus.CREATED,
      schema: {
        example: AddItemToCartExample,
      },
    }),
  );
}
