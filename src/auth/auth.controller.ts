import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Login user',
  })
  @ApiOkResponse({
    description: 'login User',
  })
  @Post('login')
  async login(@Body() body: LoginAuthDto) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new HttpException('Invalid Credentials', 403);
    }
    return this.authService.login(user);
  }

  @ApiOperation({
    summary: 'Validate Token',
  })
  @ApiOkResponse({
    description: 'Validade token',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('validate')
  validate(@Request() req) {
    return req.user;
  }
}
