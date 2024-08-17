import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  GetAllProjectsExample,
  GetOneFullProjectExample,
  ImagesArrayExample,
  ResortImagesReqExample,
  SearchProjectsExample,
} from './examples';

export function ApiUpploadImages() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary: 'Upploads images to project into aws s3.',
    }),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      description:
        'List of image files to upload: objects where keys are "file" and values are files limit 10',
      type: 'multipart/form-data',
      required: true,
      schema: {
        example: {
          fieldname: 'file',
          file: 'binary',
        },
      },
    }),
    ApiOkResponse({
      status: HttpStatus.CREATED,
      schema: {
        example: ImagesArrayExample,
      },
    }),
  );
}

export function ApiGetAllProjects() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary: 'Gets all projects of app .',
    }),

    ApiOkResponse({
      status: HttpStatus.OK,
      schema: {
        example: GetAllProjectsExample,
      },
    }),
  );
}

export function ApiSearchAllProjects() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary: 'Searching ALL projects by search string (insensitive).',
      description: 'searching by title or description or tag',
    }),

    ApiOkResponse({
      status: HttpStatus.OK,
      schema: {
        example: SearchProjectsExample,
      },
    }),
  );
}

export function ApiSearchCreatorProjects() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary:
        'Searching projects only of CREATOR by search string (insensitive).',
      description: 'searching by title or description or tag',
    }),

    ApiOkResponse({
      status: HttpStatus.OK,
      schema: {
        example: SearchProjectsExample,
      },
    }),
  );
}

export function ApiGetOneProject() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary: 'Gets one project by id with images .',
    }),

    ApiOkResponse({
      status: HttpStatus.OK,
      schema: {
        example: GetOneFullProjectExample,
      },
    }),
  );
}

export function ApiResortImages() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary: 'Resorts images while drag & drop.',
    }),

    ApiBody({
      description: 'Array of objects with imageId and orderIndex',

      required: true,
      schema: {
        example: ResortImagesReqExample,
      },
    }),
    ApiOkResponse({
      status: HttpStatus.OK,
    }),
  );
}
