import { Injectable } from '@nestjs/common';

@Injectable()
export class CallsService {

    async createCall(message: string, phones: (string | { formula: string, result: string })[]) {
        const normalizedPhones = phones.map(p =>
            typeof p === 'string' ? p : String(p.result || p.formula)
        );
    
        const phonesMessage = normalizedPhones.map(phone => `${phone},"${message}"`).join('\n');
    
        const formData = new FormData();
        formData.append('public_key', process.env.ZVONOK_PUBLIC_KEY!);
        formData.append('campaign_id', process.env.ZVONOK_CAMPAIGN_ID!);
        formData.append('phones', phonesMessage);
        formData.append('text_from_column', '1');
    
        const res = await fetch('https://zvonok.com/manager/cabapi_external/api/v1/phones/append/calls/', {
            method: 'POST',
            body: formData
        });
    
        console.log(res.status, await res.text());
    
        return res;
    }
    
}
