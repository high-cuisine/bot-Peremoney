import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/Prisma.service';
import * as ExcelJS from 'exceljs';
import { PHONE_EXAMPLE, EMAIL_EXAMPLE, TELEGRAM_ID_EXAMPLE, TELEGRAM_USERNAME } from './constant/exelData'
import { UsersClients } from 'generated/prisma';

@Injectable()
export class ExelService {
    constructor(
        private readonly prisma: PrismaService,
    ) {}

    async readExcel(buffer: Buffer, userId:number): Promise<UsersDTO[]> {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(buffer as any);   
    
        const worksheet = workbook.worksheets[0];
        const data: any[] = [];
        worksheet.eachRow((row) => {
            data.push(row.values);
        });

        
        let phoneIndex = Infinity;
        let emailIndex = Infinity;
        let telegramIndex = Infinity;
        let telegramUsernameIndex = Infinity;
        
        const usersData:UsersDTO[] = [];

        data[0].map((exelItem, index) => {
            if(PHONE_EXAMPLE.includes(exelItem)) {
                phoneIndex = index;
            }

            if(EMAIL_EXAMPLE.includes(exelItem)) {
                emailIndex = index;
            }

            if(TELEGRAM_ID_EXAMPLE.includes(exelItem)) {
                telegramIndex = index;
            }

            if(TELEGRAM_USERNAME.includes(exelItem)) {
                telegramUsernameIndex = index;
            }
        });

        data.slice(1).map(el => {
            const usersItem:UsersDTO = {
                telegramId: telegramIndex !== Infinity ? el[telegramIndex] : 0,
                userId,
                phone: phoneIndex !== Infinity ? el[phoneIndex] : 0,
                email: emailIndex !== Infinity ? el[emailIndex] : '',
                name: telegramUsernameIndex !== Infinity ? el[telegramUsernameIndex] : ''
            }

            usersData.push(usersItem);
        })
    
        return usersData;
    }

    async  exportToExcelBuffer(data:any[]) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Данные');

        if (!data.length) return null;

        const columns = Object.keys(data[0]).map(key => ({ header: key, key }));
        worksheet.columns = columns;

        data.forEach(item => worksheet.addRow(item));

        const buffer = await workbook.xlsx.writeBuffer();
        return buffer;
    }

    async readExelByOneColumn(buffer: Buffer):Promise<string[]> {
        console.log('work');
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(buffer as any);   

        const worksheet = workbook.worksheets[0];
        const data: any[] = [];
        worksheet.eachRow((row) => {
            data.push(row.values);
        });

        console.log(data);

        const res = data.map(el => String(el[1]));

        console.log(res);

        return res;
    }
}
