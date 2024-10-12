import { Book } from "../App";
import BookItem from "./Book";

type Props = {
  books: Book[];
  setBooks: (books: Book[]) => void;
};

const Books = ({ books, setBooks }: Props) => {
  return (
    <div className="books-container">
      {books.map((book) => {
        return <BookItem book={book} setBooks={setBooks} />;
      })}
    </div>
  );
};

export default Books;
