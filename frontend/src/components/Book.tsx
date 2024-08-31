import { Book } from "../App";

type Props = {
  book: Book;
};

const BookItem = ({ book }: Props) => {
  return (
    <div className="book-card">
      <div className="title">{book.title}</div>
      <div className="book-details">
        <div className="detail-category">Author:</div>
        <div>{book.author}</div>
      </div>
      <div className="book-details">
        <div className="detail-category">Genre:</div>
        <div>{book.genre}</div>
      </div>
      <div className="book-details">
        <div className="detail-category">Price:</div>
        <div>{book.price}</div>
      </div>
    </div>
  );
};

export default BookItem;
