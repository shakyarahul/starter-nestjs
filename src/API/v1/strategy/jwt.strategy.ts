import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RoleService } from 'src/Entities/role/Role.service';
import { SocialAccountService } from 'src/Entities/social_account/SocialAccount.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly socialAccountService: SocialAccountService,
    private readonly roleService: RoleService,
  ) {
    super({
      secretOrKey: 'SECRET',
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any) {
    const role = await this.roleService.findAEntity({ name: payload.roles[0] });
    if (!role) {
      throw new UnauthorizedException();
    }
    const user = await this.socialAccountService.findAEntity({
      id: payload.sub,
      social_account_email: payload.name,
      role,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return { ...payload, user };
  }
}
