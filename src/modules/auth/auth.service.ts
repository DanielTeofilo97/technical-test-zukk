import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  private audience = 'users';
  private issuer = 'login';

  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  createToken(user: any) {
    user.token = this.jwtService.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      {
        expiresIn: '7 days',
        subject: user.id,
        issuer: this.issuer,
        audience: this.audience,
      },
    );
    return {
      user,
    };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        audience: this.audience,
        issuer: this.issuer,
      });
      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  async login(cpf: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        cpf,
      },
      select: {
        id: true,
        name: true,
        password: true,
        role: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('CPF e/ou senha incorretos.');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('CPF e/ou senha incorretos.');
    }

    delete user.password;

    return this.createToken(user);
  }

  async register(data: AuthRegisterDTO) {
    const userExists = await this.prisma.user.findFirst({
      where: {
        cpf: data.cpf,
      },
    });

    if (userExists) {
      throw new BadRequestException('CPF já cadastrado.');
    }

    const user = await this.userService.create(data);

    const userCreated = await this.prisma.user.findFirst({
      where: {
        id: user.id,
      },
      select: {
        id: true,
        name: true,
        role: true,
      },
    });

    return this.createToken(userCreated);
  }
}
