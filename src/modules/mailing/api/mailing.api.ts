import { MAILING_START_URL } from "../contants/contants";

export class MailingApi {
    private constructor() {}

    // static async sendMailing(message: string, phones: string[]) {
    //     const numbersString = phones.map(phone => `numbers[]=${phone}`).join('&');
       
    //     const url = MAILING_START_URL + `${numbersString}&text=${message.replaceAll(' ', '+')}&sign=SMS Aero`
    //     console.log(url);
    //     const response = await fetch(url);
    //     const data = await response.json();

    //     console.log(data);

    //      return data;
    // }

    static async sendMailing(message: string, phones: string[]) {
        const email = '1highcuisine1@gmail.com'; 
        const apiKey = 'cKoazWnNVfmLEjPXygzK8fD-h0nQwgrK'; 
        
        const baseUrl = 'https://gate.smsaero.ru/v2/sms/send';
        const numbersString = phones.map(phone => `numbers[]=${encodeURIComponent(phone)}`).join('&');
        const textParam = `text=${encodeURIComponent(message)}`;
        const signParam = `sign=${encodeURIComponent('SMS Aero')}`;
        
        const url = `${baseUrl}?${numbersString}&${textParam}&${signParam}`;
        
        console.log('Request URL:', url);
        
        const response = await fetch(url, {
            headers: {
                'Authorization': `Basic ${Buffer.from(`${email}:${apiKey}`).toString('base64')}`,
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`SMS sending failed: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Response:', data);
        
        return data;
    }
}

export default MailingApi;