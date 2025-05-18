

import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidDataException extends HttpException {
  constructor(details?: string) {
    super(
      {
        statusCode: HttpStatus.UNAUTHORIZED,
        error: 'InvalidData',
        message: details || 'Переданы некорректные данные',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
