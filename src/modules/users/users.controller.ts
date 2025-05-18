import { Controller, Get, Post, Req, Res, Headers, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { DailyBonus } from './types/DailyBonus.type';
import { LevelUpInterface } from './types/LevelUp.type';

@Controller('users')
export class UsersController {

    constructor(
        private readonly userService: UsersService,
    )
    {}

    @Post('login')
    async login(@Req() req:Request, @Res() res: Response) {
        try {
            const { userId, hash } = req.body;

            if(!userId || !hash) 
                return res.status(400).json('not userId or hash');
            
            const token = await this.userService.login(userId, hash);

            res.status(200).json(token);
        }

        catch(e) {
            console.log(e);
        }
    }

    
}


// login //auth // update-scores