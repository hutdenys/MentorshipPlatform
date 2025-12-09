import { Controller, Get, Param, Patch, Body, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.usersService.findById(Number(id));
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() data: any) {
        return this.usersService.update(Number(id), data);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(Number(id));
    }
}
