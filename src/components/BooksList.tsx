import React from "react";
import Book from "../types/Book";

interface BooksListProps {
  books: Book[];
}

export const BooksList: React.FC<BooksListProps> = ({ books }) => {
  return (
    <table>
      <thead>
        {books.length > 0 && (
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
            <th>Pages</th>
          </tr>
        )}
      </thead>
      <tbody>
        {books.map((book: Book) => (
          <tr key={book.key}>
            <td>{book.title}</td>
            <td>{book.author_name}</td>
            <td>{book.first_publish_year}</td>
            <td>{book.number_of_pages_median}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BooksList;
