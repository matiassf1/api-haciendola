import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LocalGuard } from '../guard/local.guard';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor() { }

    @Post()
    @UseGuards(LocalGuard)
    login(@Req() req: Request): string {
        console.log(req.user);
        return req.user as string;
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    status(@Req() req: Request) {
        console.log(req.user);
        return req.user;
    }
}
