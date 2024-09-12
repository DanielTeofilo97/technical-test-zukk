import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'Fazer Login' })
  @ApiResponse({ status: 200, description: 'Login efetuado com sucesso' })
  @ApiResponse({
    status: 400,
    description: 'Erro ao fazer login',
  })
  @ApiTags('auth')
  @Post('login')
  @HttpCode(200)
  async login(@Body() { cpf, password }: AuthLoginDTO) {
    return this.authService.login(cpf, password);
  }

  @ApiOperation({ summary: 'Fazer cadastro' })
  @ApiResponse({ status: 200, description: 'Cadastro efetuado com sucesso' })
  @ApiResponse({
    status: 400,
    description: 'Erro ao fazer cadastro',
  })
  @ApiTags('auth')
  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return this.authService.register(body);
  }
}
