import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ProjectService } from 'src/6project/project.service';

@Injectable()
export class IsOwnerImageGuard implements CanActivate {
  constructor(private readonly projectService: ProjectService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.userId;

    let projectId = request.params.projectId;
    if (!projectId) {
      projectId = request.query.projectId;
    }
    const { imageId } = request.query;

    if (typeof projectId !== 'string' || typeof imageId !== 'string') {
      throw new ForbiddenException('Invalid query parameters.');
    }

    const isImageOwner = await this.projectService.isImageOfProject(
      projectId,
      imageId,
    );

    if (!isImageOwner) {
      throw new ForbiddenException(
        'The image does not belong to the specified project.',
      );
    }

    return true;
  }
}
