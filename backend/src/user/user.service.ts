import { Injectable } from '@nestjs/common';
import { PostgresService } from 'src/database/postgres/postgres.service';
// import { PrismaService } from '@/prisma.service';

@Injectable()
export class UserService {
  constructor(private postgresService: PostgresService) {}

  async getProfile(userId: string) {
    return this.postgresService.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        displayName: true,
        phone: true,
        email: true,
        customShareId: true,
        shareByEmail: true,
        shareByPhone: true,
      },
    });
  }

  async updateProfile(userId: string, data: any) {
    return this.postgresService.user.update({
      where: { id: userId },
      data,
    });
  }
}
