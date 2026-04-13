import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext) {
    const roles = this.reflector.get('roles', ctx.getHandler());
    const req = ctx.switchToHttp().getRequest();

    return roles.includes(req.user.role);
  }
}