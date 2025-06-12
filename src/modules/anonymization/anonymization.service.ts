import { Injectable } from '@nestjs/common';

@Injectable()
export class AnonymizationService {

    async getDeAnonymizeList(emails: any[]) {
        const data = await this.pushEmailsBatch(emails);
        console.log(data);
        const emailsFromApi = await this.getValidateMailsFromApi(data.batchId);
        
        const validEmails = this.getValidEmails(emailsFromApi);
        return validEmails;
    }

    async pushEmailsBatch(emails: any[]): Promise<any> {
        const API_KEY = process.env.USEBOYNCER_API_KEY;
        const url = 'https://api.usebouncer.com/v1.1/email/verify/batch'; 
      
        const body = {
          emails: emails
        };

        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'x-api-key': API_KEY,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body.emails),
          });

          if (!response.ok) {
            console.error('Ошибка запроса:', response);
            return null;
          }
      
          return (await response.json());
        } catch (error) {
          console.error('Ошибка пакетной верификации:', error);
          return null;
        }
    }

    async getEmailsBatch() {
      const options = {method: 'GET', headers: {'x-api-key': '<api-key>'}};

      fetch(`https://api.usebouncer.com/v1.1/email/verify/batch/{batchId}/download`, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
    }

    async getValidEmails(emails: any[]) {
        const valideEmails = [];

        for (const data of emails) {
            if (
                data.status === 'deliverable' &&
                data.reason === 'accepted_email' &&
                data.domain?.disposable === 'no' &&
                data.toxic === 'no'
              ) {
                valideEmails.push({ email: data.email });
              }
        }

        return valideEmails;
    }
      

    async verifyPhone(phone: string) {

    }

    async getValidateMailsFromApi(bashId:string): Promise<any> {
      const API_KEY = process.env.USEBOYNCER_API_KEY;
      const options = {method: 'GET', headers: {'x-api-key': API_KEY}};

      return new Promise((resolve, reject) => {
        const interval = setInterval(async () => {
          try {
            const response = await fetch(`https://api.usebouncer.com/v1.1/email/verify/batch/${bashId}/download`, options);
            const data = await response.json();
            
            if (data) {
              clearInterval(interval);
              resolve(data);
            }
          } catch (error) {
            console.error('Error fetching valid mails:', error);
            clearInterval(interval);
            reject(error);
          }
        }, 1000 * 100); // Check every 100 seconds
      });
    }
    
}
