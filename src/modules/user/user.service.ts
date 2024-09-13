import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserDTO } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PatchUserDTO } from './dto/patch-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDTO) {
    data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
    return this.prisma.user.create({
      data: data,
    });
  }

  async list() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        cpf: true,
        role: true,
      },
      orderBy: {
        role: 'asc',
      },
    });
  }

  async listOne(id: string) {
    await this.exists(id);
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, data: UpdateUserDTO) {
    await this.exists(id);
    data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
    return this.prisma.user.update({
      data: data,
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
  }

  async updatePartial(id: string, data: PatchUserDTO) {
    await this.exists(id);
    data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
    return this.prisma.user.update({
      data: data,
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
  }

  async delete(id: string) {
    await this.exists(id);

    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async exists(id: string) {
    if (
      !(await this.prisma.user.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`O Usuário ${id} não existe.`);
    }
  }

  formatData(data: any) {
    if (!data) {
      return null;
    } else {
      return new Date(data);
    }
  }
}
