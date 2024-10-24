import { Injectable } from '@nestjs/common';
import * as bunyan from 'bunyan';

@Injectable()
export class BunyanLoggerService {
  private readonly logger: bunyan;

  constructor() {
    this.logger = bunyan.createLogger({ name: 'book-crud' });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace: string) {
    this.logger.error({ trace }, message);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.trace(message);
  }
}
