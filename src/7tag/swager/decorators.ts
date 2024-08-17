import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { AddTagProjectDto } from '../dto/add-tag-project.dto';
import { RemoveTAGfromProjectExample } from './examples';

export function ApiCreateTag() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary: 'Creates tag.',
    }),

    ApiBody({
      description: '',
      // type:  {title; string},
      required: true,
    }),
    ApiOkResponse({
      status: HttpStatus.CREATED,
      schema: {
        example: {},
      },
    }),
  );
}

export function ApiAddTagToProject() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary: 'Adds tag to the project.',
    }),

    ApiBody({
      description: '',
      type: AddTagProjectDto,
      required: true,
    }),
    ApiOkResponse({
      status: HttpStatus.CREATED,
      schema: {
        example: {},
      },
    }),
  );
}

export function ApiRemoveTAGfromProject() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary: 'Removes tag from project.',
    }),

    ApiQuery({
      name: 'projectId',
      type: String,
      description: 'The ID of the project',
      required: true,
    }),
    ApiQuery({
      name: 'tagId',
      type: String,
      description: 'The ID of the tag to be removed',
      required: true,
    }),
    ApiOkResponse({
      status: HttpStatus.OK,
      schema: {
        example: RemoveTAGfromProjectExample,
      },
    }),
  );
}
