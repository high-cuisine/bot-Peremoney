import { Injectable } from '@nestjs/common';
import * as FormData from 'form-data';
import axios from 'axios';
import { https } from 'follow-redirects';
import { createReadStream } from 'fs';

@Injectable()
export class CallsService {

    async createCall(message: string, phones: string[]) {

        console.log(message, phones)
        
    
        // const phonesMessage = phones.map(phone => `${phone},"${message}"`).join('\n');

        const phonesMessage = `79658879405,"${message}"`;
        
    
        const formData = new FormData();
        formData.append('public_key', process.env.ZVONOK_PUBLIC_KEY!);
        formData.append('campaign_id', process.env.ZVONOK_CAMPAIGN_ID!);
        formData.append('phones', phonesMessage);
        formData.append('text_from_column', '1');
    
        const res = await axios.post('https://zvonok.com/manager/cabapi_external/api/v1/phones/append/calls/', formData, {
            headers: formData.getHeaders()
        });
    
        console.log(res.status, res.data);
    
        return res;
    }
    
    async createCallWithAudio(
      audioBuffer: Buffer,
      fileName: string,
      phones: string[]
    ): Promise<any> {
      return new Promise(async (resolve, reject) => {
        const form = new FormData();
        form.append("public_key", process.env.ZVONOK_PUBLIC_KEY!);
        form.append("clip_name", fileName);
        form.append("clip_file", audioBuffer, {
          filename: fileName,
          contentType: "audio/ogg"
        });
        form.append("speaker", "default");
        form.append("text", "Audio message");
        form.append("phones", JSON.stringify(phones));
    
        const headers = form.getHeaders();
        // Опционально: зафиксировать Content-Length, чтобы сервер не обрывал «долгоиграющие» потоки
        const length: number = await new Promise((res, rej) =>
          form.getLength((err, len) => err ? rej(err) : res(len!))
        );
        headers['Content-Length'] = String(length);
    
        const req = https.request({
          method: 'POST',
          hostname: 'zvonok.com',
          path: '/manager/cabapi_external/api/v1/audio/upload/',
          headers,
          maxRedirects: 20
        }, res => {
          const chunks: Buffer[] = [];
          res.on('data', c => chunks.push(c));
          res.on('end', () => {
            const body = Buffer.concat(chunks).toString();
            if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
              resolve(this.createCallWithUploadedAudio(phones));
            } else {
              reject(new Error(`Upload failed: ${res.statusCode} ${body}`));
            }
          });
        });
    
        req.on('error', reject);
        form.pipe(req);
      });
    }
    
    private async createCallWithUploadedAudio(phones: string[]): Promise<any> {
        try {
            const phonesMessage = phones.join('\n');
            
            const formData = new FormData();
            formData.append('public_key', process.env.ZVONOK_PUBLIC_KEY!);
            formData.append('campaign_id', process.env.ZVONOK_CAMPAIGN_ID!);
            formData.append('phones', phonesMessage);
            formData.append('text_from_column', '1');
            formData.append('use_audio', 'true'); // Указываем что используем аудио

            console.log('[CallsService] Creating call campaign with audio');

            const response = await axios.post(
                'https://zvonok.com/manager/cabapi_external/api/v1/phones/append/calls/', 
                formData,
                {
                    headers: formData.getHeaders()
                }
            );

            const result = response.data;
            console.log('[CallsService] Call campaign response:', response.status, result);

            return { success: response.status >= 200 && response.status < 300, data: result };
        } catch (error) {
            console.error('[CallsService] Error creating call campaign:', error);
            throw error;
        }
    }
    

    async loadAudio(audioBuffer: Buffer): Promise<number> {
      return new Promise((resolve, reject) => {
        const data = new FormData();
        
        // Создаем временный файл из Buffer или используем Buffer напрямую
        data.append('public_key', process.env.ZVONOK_PUBLIC_KEY!);
        data.append('clip_name', 'audio_' + Date.now());
        data.append('clip_file', audioBuffer, {
          filename: 'audio.ogg',
          contentType: 'audio/ogg'
        });
        data.append('speaker', 'default');
        data.append('text', 'Audio message');

        const config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'https://zvonok.com/manager/cabapi_external/api/v1/audio/upload/',
          headers: { 
            ...data.getHeaders()
          },
          data: data
        };

        let audioId: number = 0;

        axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            resolve(response.data.audioclip_id);
            audioId = response.data.audioclip_id;
          })
          .catch(function (error) { 
            console.log(error);
            reject(error);
          });
      });

    }

    async createCallWithAudioV2(audiobuffer: Buffer, numbers: string[]) {
      const audioId = await this.loadAudio(audiobuffer);


      await new Promise(resolve => setTimeout(resolve, 30000));
      
      console.log('[CallsService] Audio ID:', audioId);

      var data = new FormData();
      data.append('public_key', process.env.ZVONOK_PUBLIC_KEY!);
      data.append('phone', '+79376332037');
      data.append('campaign_id', process.env.ZVONOK_CAMPAIGN_ID!);
      data.append('text', `<audio id="${audioId}"/>`);

      var config = {
        method: 'post',
        maxBodyLength: Infinity,
          url: 'https://zvonok.com/manager/cabapi_external/api/v1/phones/call/',
          headers: { 
            ...data.getHeaders()
          },
          data : data
        };

      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    }
}
