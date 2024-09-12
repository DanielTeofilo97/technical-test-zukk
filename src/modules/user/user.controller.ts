import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { PatchUserDTO } from './dto/patch-user.dto';
import { UserService } from './user.service';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';


@ApiBearerAuth()
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
})
@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Criar Usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado' })
  @ApiResponse({
    status: 400,
    description: 'Erro durante a criação do usuário',
  })
  @ApiTags('users')
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data);
  }

  @ApiOperation({ summary: 'Listagem Usuários' })
  @ApiResponse({ status: 200, description: 'Listagem de usuários' })
  @ApiResponse({
    status: 404,
    description: 'Nenhum usuário encontrado',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao buscar usuários',
  })
  @ApiTags('users')
  @Get()
  async read() {
    return this.userService.list();
  }

  @ApiOperation({ summary: 'Buscar Usuário pelo id' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  @ApiTags('users')
  @Get(':id')
  async readOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.listOne(id);
  }

  @ApiOperation({ summary: 'Atualizar Usuário pelo id' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  @ApiTags('users')
  @Put(':id')
  async update(
    @Body() data: UpdateUserDTO,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.userService.update(id, data);
  }

  @ApiOperation({ summary: 'Atualizar Usuário parcialmente  pelo id' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  @ApiTags('users')
  @Patch(':id')
  async updatePartial(
    @Body() data: PatchUserDTO,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.userService.updatePartial(id, data);
  }

  @ApiOperation({ summary: 'Desabilitar Usuário' })
  @ApiResponse({ status: 200, description: 'Usuário desabilitado.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  @ApiTags('users')
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.delete(id);
  }
}
