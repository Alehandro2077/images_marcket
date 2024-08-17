import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
// import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  GetObjectCommandOutput,
  DeleteObjectCommand,
  DeleteObjectsCommand,
} from '@aws-sdk/client-s3';

import * as sharp from 'sharp';

import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import {
  createPresignedPost,
  PresignedPost,
  PresignedPostOptions,
} from '@aws-sdk/s3-presigned-post';

import { v4 as uuidv4 } from 'uuid';
import { AwsConfigService } from 'src/aws/aws.config.service';

@Injectable()
export class FileUploadService {
  private readonly logger = new Logger(FileUploadService.name);

  constructor(private readonly awsConfigService: AwsConfigService) {}

  // async uploadFile(file: Express.Multer.File): Promise<string> {
  //   try {
  //     console.log('-==-=-=-=-=-file mimetype', file.mimetype);
  //     const fileKey = `${uuidv4()}-${file.originalname}`;
  //     const s3Client = this.awsConfigService.getS3Client();

  //     const uploadParams = {
  //       Bucket: process.env.AWS_S3_BUCKET_NAME,
  //       Key: fileKey,
  //       Body: file.buffer,
  //       ContentType: file.mimetype,
  //     };
  //     const command = new PutObjectCommand(uploadParams);
  //     await s3Client.send(command);
  //     // const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;
  //     return fileKey;
  //   } catch (error) {
  //     this.logger.error('upload file', error);

  //     throw new HttpException(
  //       'An error occurred while upload file.',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  async compressImage(buffer: Buffer) {
    const thumbnailBuffer = await sharp(buffer)
      .resize(300, 300, { fit: 'inside', withoutEnlargement: true })
      .toBuffer();

    return thumbnailBuffer;
  }

  async uploadImage2(key: string, mimeType: string) {
    const s3Client = this.awsConfigService.getS3Client();

    console.log('-=-=-=-=in uploadimage2 mimeType', mimeType);

    const params: PresignedPostOptions = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
      Conditions: [
        ['content-length-range', 0, 62914560], // Обмеження на розмір файлу (60 MB в байтах)
        ['eq', '$Content-Type', mimeType], // Встановлюємо тип контенту
      ],
      Fields: {
        'Content-Type': mimeType,
      },
      Expires: 3600, // Термін дії URL в секундах (1 година)
    };

    const presignedPost = await createPresignedPost(s3Client, params);
    return presignedPost;
  }

  // async uploadImage2(key: string, mimeType: string) {
  //   const s3Client = this.awsConfigService.getS3Client();

  //   console.log('-=-=-=-=in uploadimage2 mimeType', mimeType);
  //   const params = {
  //     Bucket: process.env.AWS_S3_BUCKET_NAME,
  //     Key: key,
  //     Expires: 3600,
  //     ContentType: mimeType,
  //   };

  //   // const output = await s3Client.send(command);

  //   const presignedUrl = await this.s3.getSignedUrlPromise('putObject', params);

  //   return presignedUrl;
  // }

  // async uploadImage(
  //   buffer: Buffer,
  //   key: string,
  //   mimeType: string,
  // ): Promise<void> {
  //   const s3Client = this.awsConfigService.getS3Client();

  //   const command = new PutObjectCommand({
  //     Bucket: process.env.AWS_S3_BUCKET_NAME,
  //     Key: key,
  //     Body: buffer,
  //     ContentType: mimeType,
  //   });

  //   const output = await s3Client.send(command);

  //   this.s3.getSignedUrlPromise('putObject', params);

  //   console.log('0-0-0-0-0-==-=-=-=-output', output);
  // }

  async getSignedUrl(key: string): Promise<string> {
    try {
      const s3Client = this.awsConfigService.getS3Client();
      const command = new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
      });

      return await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // 1 hour expiration
    } catch (error) {
      this.logger.error('getSignedUrl', error);

      throw new HttpException(
        'An error occurred while getSignedUrl of  file.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteOneImage(originalKey: string, thumbnailKey: string) {
    try {
      const s3Client = this.awsConfigService.getS3Client();

      const deleteParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Delete: {
          Objects: [{ Key: originalKey }, { Key: thumbnailKey }],
          Quiet: false, // If set to true, Amazon S3 will not return information about the deleted objects.
        },
      };
      console.log('-=-=-=-=-=-deleteParams', deleteParams);

      const command = new DeleteObjectsCommand(deleteParams);
      const response = await s3Client.send(command);
      this.logger.log(
        `Successfully deleted image with keys : ${originalKey}, ${thumbnailKey}`,
      );

      return response;
    } catch (error) {
      this.logger.error('deleteImage', error);

      throw new HttpException(
        'An error occurred while deleting the file.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteImages(keys: string[]) {
    try {
      if (keys.length === 0) {
        this.logger.warn('No keys provided for deletion.');
        return;
      }
      const s3Client = this.awsConfigService.getS3Client();

      const deleteParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Delete: {
          Objects: keys.map((key) => ({ Key: key })),
          Quiet: false, // If set to true, Amazon S3 will not return information about the deleted objects.
        },
      };

      const command = new DeleteObjectsCommand(deleteParams);
      const response = await s3Client.send(command);
      console.log('-=-=-=-=-=-resp deleted', response);

      this.logger.log(
        `Successfully deleted images: ${JSON.stringify(response.Deleted)}`,
      );
      return response;
    } catch (error) {
      this.logger.error('deleteImage', error);

      throw new HttpException(
        'An error occurred while deleting the file.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
