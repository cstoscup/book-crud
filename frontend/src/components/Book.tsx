import axios from "axios";
import { Book } from "../App";
import { useState } from "react";

type Props = {
  book: Book;
  setBooks: (books: Book[]) => void;
};

const BookItem = ({ book, setBooks }: Props) => {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [genre, setGenre] = useState(book.genre);
  const [price, setPrice] = useState(book.price);

  const deleteBook = () => {
    axios.delete(`http://localhost:3000/book/${book.id}`).then((response) => {
      setBooks(response.data);
    });
  };

  const editBook = () => {
    setEdit(!edit);

    if (edit) {
      if (
        title !== book.title ||
        author !== book.author ||
        genre !== book.genre ||
        price !== book.price
      ) {
        axios
          .put(`http://localhost:3000/book/${book.id}`, {
            title,
            author,
            genre,
            price,
          })
          .then((response) => {
            setBooks(response.data);
          });
      } else {
        console.log("NO CHANGES");
      }
    }
  };

  const editTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const editAuthor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
  };

  const editGenre = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGenre(e.target.value);
  };

  const editPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  return (
    <div className="book-card">
      {edit ? (
        <input value={title} onChange={editTitle}></input>
      ) : (
        <div className="title">{book.title}</div>
      )}
      <div className="book-details">
        <div className="detail-category">Author:</div>
        {edit ? (
          <input value={author} onChange={editAuthor}></input>
        ) : (
          <div>{book.author}</div>
        )}
      </div>
      <div className="book-details">
        <div className="detail-category">Genre:</div>
        {edit ? (
          <input value={genre} onChange={editGenre}></input>
        ) : (
          <div>{book.genre}</div>
        )}
      </div>
      <div className="book-details">
        <div className="detail-category">Price:</div>
        {edit ? (
          <input value={price} onChange={editPrice}></input>
        ) : (
          <div>{book.price}</div>
        )}
      </div>
      <button onClick={editBook}>{edit ? "Save" : "Edit"}</button>
      <button onClick={deleteBook}>Delete</button>
    </div>
  );
};

export default BookItem;
