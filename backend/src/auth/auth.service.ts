import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PrismaService } from '@/prisma.service';
import * as bcrypt from 'bcrypt';
import { PostgresService } from 'src/database/postgres/postgres.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private postgresService: PostgresService, private jwt: JwtService) {}

  async signup(data: { phone: string; password: string; }) {
    const hash = await bcrypt.hash(data.password, 10);
    const user = await this.postgresService.user.create({
      data: {
        phone: data.phone,
        passwordHash: hash,
        // displayName: data.displayName,
      },
    });
    return this.jwt.sign({ sub: user.id });
  }

  async login(data: { phone: string; password: string }) {
    const user = await this.postgresService.user.findUnique({ where: { phone: data.phone } });
    if (!user || !(await bcrypt.compare(data.password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.jwt.sign({ sub: user.id });
  }
}
