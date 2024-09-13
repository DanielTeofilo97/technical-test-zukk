import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as authLoginExamples from './examples/auth-login.example.json';
import * as authRegisterExamples from './examples/auth-register.example.json';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @ApiOperation({ summary: 'Fazer Login' })
  @ApiResponse({
    status: 200, description: 'Login efetuado com sucesso',
    content: {
      'application/json': {
        example: authLoginExamples['200']
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao fazer login',
    content: {
      'application/json': {
        example: authLoginExamples['400']
      }
    }
  })
  @ApiTags('auth')
  @Post('login')
  @HttpCode(200)
  async login(@Body() { cpf, password }: AuthLoginDTO) {
    return this.authService.login(cpf, password);
  }

  @ApiOperation({ summary: 'Fazer cadastro' })
  @ApiResponse({
    status: 200, description: 'Cadastro efetuado com sucesso',
    content: {
      'application/json': {
        example: authRegisterExamples['200']
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao fazer cadastro',
    content: {
      'application/json': {
        example: authRegisterExamples['400']
      }
    }
  })
  @ApiTags('auth')
  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return this.authService.register(body);
  }
}
