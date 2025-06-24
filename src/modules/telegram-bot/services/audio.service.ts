import { Injectable } from '@nestjs/common';

@Injectable()
export class AudioService {
  
  async processVoiceMessage(fileBuffer: Buffer, originalFileName: string): Promise<{
    buffer: Buffer;
    fileName: string;
    mimeType: string;
  }> {
    // Определяем MIME тип на основе расширения файла
    const mimeType = this.getMimeType(originalFileName);
    
    return {
      buffer: fileBuffer,
      fileName: originalFileName,
      mimeType
    };
  }

  private getMimeType(fileName: string): string {
    const extension = fileName.toLowerCase().split('.').pop();
    
    switch (extension) {
      case 'ogg':
        return 'audio/ogg';
      case 'oga':
        return 'audio/ogg';
      case 'm4a':
        return 'audio/mp4';
      case 'mp3':
        return 'audio/mpeg';
      case 'wav':
        return 'audio/wav';
      default:
        return 'audio/ogg'; // Telegram обычно отправляет в формате OGG
    }
  }

  // Метод для получения информации о файле (если понадобится)
  getFileInfo(fileBuffer: Buffer, fileName: string) {
    return {
      size: fileBuffer.length,
      fileName,
      mimeType: this.getMimeType(fileName)
    };
  }
} 