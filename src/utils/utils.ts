import Book from '../types/Book';

export const getBookId = (book: Book) => {
  return book.isbn ? book.isbn[0] : null;
}
