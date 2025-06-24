import { Injectable } from '@nestjs/common';
import * as FormData from 'form-data';

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
    
        const res = await fetch('https://zvonok.com/manager/cabapi_external/api/v1/phones/append/calls/', {
            method: 'POST',
            body: formData as any
        });
    
        console.log(res.status, await res.text());
    
        return res;
    }

    async createCallWithAudio(
        audioBuffer: Buffer, 
        fileName: string, 
        phones: string[]
    ): Promise<any> {
        try {
            const formData = new FormData();
            formData.append("public_key", process.env.ZVONOK_PUBLIC_KEY!);
            formData.append("clip_name", fileName);
            
            // Добавляем буфер как файл в FormData
            formData.append("clip_file", audioBuffer, {
                filename: fileName,
                contentType: 'audio/ogg'
            });
            
            formData.append("speaker", "default");
            formData.append("text", "Audio message");

            console.log('[CallsService] Uploading audio file:', {
                fileName,
                size: audioBuffer.length,
                phonesCount: phones.length
            });

            const response = await fetch(
                "https://zvonok.com/manager/cabapi_external/api/v1/audio/upload/", 
                {
                    method: 'POST',
                    body: formData as any
                }
            );

            const result = await response.text();
            console.log('[CallsService] Audio upload response:', response.status, result);

            if (!response.ok) {
                throw new Error(`Audio upload failed: ${response.status} ${result}`);
            }

            // После успешной загрузки аудио, создаем кампанию обзвона
            return await this.createCallWithUploadedAudio(phones);

        } catch (error) {
            console.error('[CallsService] Error in createCallWithAudio:', error);
            throw error;
        }
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

            const response = await fetch(
                'https://zvonok.com/manager/cabapi_external/api/v1/phones/append/calls/', 
                {
                    method: 'POST',
                    body: formData as any
                }
            );

            const result = await response.text();
            console.log('[CallsService] Call campaign response:', response.status, result);

            return { success: response.ok, data: result };
        } catch (error) {
            console.error('[CallsService] Error creating call campaign:', error);
            throw error;
        }
    }
    
}
