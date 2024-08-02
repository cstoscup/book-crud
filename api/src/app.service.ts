import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository } from 'typeorm';
import { BookDto } from './app.controller';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}

  async getBooks() {
    return await this.bookRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async getBook(id: number) {
    return await this.bookRepository.findOneBy({ id });
  }

  async createBook(book: BookDto) {
    await this.bookRepository.save(book);
    return await this.getBooks();
  }

  async updateBook(id: number, book: BookDto) {
    await this.bookRepository.update(id, book);
    return await this.getBooks();
  }

  async deleteBook(id: number) {
    await this.bookRepository.delete(id);
    return await this.getBooks();
  }
}
