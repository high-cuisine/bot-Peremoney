import { MAILING_START_URL } from "../contants/contants";

export class MailingApi {
    private constructor() {}

    static async sendMailing(message: string, phones: string[]) {
        // Your API login credentials and message details
const login = 'Snick-2001';  // replace with your login
const password = '258930';  // replace with your password
const phone = '+79658879405';  // replace with the recipient's phone number
const text = 'Your message text';  // replace with your message text

// API endpoint for sending messages
const baseUrl = "http://api.sms-boom.ru/messages/v2/send/";

// Create the URL with query parameters
const url = new URL(baseUrl);
url.searchParams.append('phone', phone);
url.searchParams.append('text', text);

// Create Basic Auth header
const headers = new Headers();
headers.set('Authorization', 'Basic ' + btoa(login + ":" + password));

// Send the GET request
fetch(url, {
    method: 'GET',
    headers: headers
})
.then(response => {
    console.log('HTTP Status Code:', response.status);
    return response.text().then(text => {
        console.log('Response Body:', text);
    });
})
.catch(error => {
    console.error('Error:', error);
});
    }

    // static async sendMailing(message: string, phones: string[]) {
    //     const email = '1highcuisine1@gmail.com'; 
    //     const apiKey = 'cKoazWnNVfmLEjPXygzK8fD-h0nQwgrK'; 
        
    //     const baseUrl = 'https://gate.smsaero.ru/v2/sms/send';
    //     const numbersString = phones.map(phone => `numbers[]=${encodeURIComponent(phone)}`).join('&');
    //     const textParam = `text=${encodeURIComponent(message)}`;
    //     const signParam = `sign=${encodeURIComponent('SMS Aero')}`;
        
    //     const url = `${baseUrl}?${numbersString}&${textParam}&${signParam}`;
        
    //     console.log('Request URL:', url);
        
    //     const response = await fetch(url, {
    //         headers: {
    //             'Authorization': `Basic ${Buffer.from(`${email}:${apiKey}`).toString('base64')}`,
    //             'Accept': 'application/json'
    //         }
    //     });
        
    //     if (!response.ok) {
    //         throw new Error(`SMS sending failed: ${response.status} ${response.statusText}`);
    //     }
        
    //     const data = await response.json();
    //     console.log('Response:', data);
        
    //     return data;
    // }
}

export default MailingApi;