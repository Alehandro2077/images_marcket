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
export class IsOwnerGuard implements CanActivate {
  constructor(private readonly projectService: ProjectService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.userId;
    let projectId = request.params.projectId;
    if (!projectId) {
      projectId = request.query.projectId;
    }
    // Check if the user is the owner of the project
    const isOwner = await this.projectService.isUserOwnerOfProject(
      userId,
      projectId,
    );
    if (!isOwner) {
      throw new ForbiddenException('You are not the owner of this project.');
    }

    return isOwner;
  }
}
