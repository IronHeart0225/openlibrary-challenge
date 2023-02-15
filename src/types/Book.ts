interface Book {
  title: string;
  key: string;
  first_publish_year: number;
  author_name?: string;
  isbn?: string[];
  number_of_pages_median?: number;
};

export default Book;
