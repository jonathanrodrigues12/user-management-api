import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Create a new user.',
  })
  @ApiOkResponse({
    description: 'Create a new user',
  })
  @Post('/create-new-user')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @ApiOperation({
    summary: 'Update a user.',
  })
  @ApiOkResponse({
    description: 'Update a  user',
  })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @ApiOperation({
    summary: 'Delete a user.',
  })
  @ApiOkResponse({
    description: 'Delete a  user',
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async softDeleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.softDeleteUser(id);
  }

  @ApiOperation({
    summary: 'Restore a user deleted.',
  })
  @ApiOkResponse({
    description: 'Restore a user deleted.',
  })
  @Patch('restore/:id')
  async restoreUser(@Param('id') id: string): Promise<User> {
    return this.userService.restoreUser(id);
  }

  @ApiOperation({
    summary: 'Get one user.',
  })
  @ApiOkResponse({
    description: 'Get one user',
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOneUser(@Param('id') id: string): Promise<User> {
    return this.userService.findOneUser(id);
  }

  @ApiOperation({
    summary: 'Get all user.',
  })
  @ApiOkResponse({
    description: 'Get all user',
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.userService.findAllUsers(page, Math.min(limit, 100));
  }
}
