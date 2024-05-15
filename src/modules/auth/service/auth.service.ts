import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@user/application/service/user.service';
import { User } from '@user/core/domain/user.entity';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async validateUser(username: string, password: string): Promise<string> {
    console.log(username, password);
    
    const user = await this.userService.findOneByUsername(username);
    
    if (!user) {
      throw new NotFoundException(`User with the username: ${username} not found.`)
    }

    if (!await compare(password, user.password)) {
      throw new BadRequestException("Invalid credentials.");
    }

    const { password: userDbPassword, ...userRest } = user

    return this.jwtService.sign(userRest);
  }
}
