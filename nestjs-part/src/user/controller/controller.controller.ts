import { Controller, Get, Post } from '@nestjs/common';

@Controller('user')
export class UserController 
{
    @Post()
    createUser(): string
    {
        return 'This action adds a new user';
    }

    @Get()
    findAll(): string
    {
        return 'This action returns all users';
    }
}
