import axios from "axios";
import { useState } from "react";
import { Book } from "../App";

type Props = {
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
};

const BookForm = ({ setBooks }: Props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState("");

  const [error, setError] = useState("");

  const addTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setError("");
  };

  const addAuthor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
    setError("");
  };

  const addGenre = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGenre(e.target.value);
    setError("");
  };

  const addPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
    setError("");
  };

  const submitBook = () => {
    if (title !== "" && author !== "" && genre !== "" && price !== "") {
      axios
        .post("http://localhost:3000/book", {
          title,
          author,
          genre,
          price,
        })
        .then((response) => {
          setBooks(response.data);
          setTitle("");
          setAuthor("");
          setGenre("");
          setPrice("");
        })
        .catch((error) => {
          // Catch an error from the API
          setError(error.message);
        });
    } else {
      // Catch any user input issues before sending to the API
      let errorMessage = "";
      let count = 0;

      if (title === "") {
        errorMessage += "title";
        count++;
      }
      if (author === "") {
        if (count > 0) {
          errorMessage += ", author";
        } else {
          errorMessage += "author";
        }

        count++;
      }
      if (genre === "") {
        if (count > 0) {
          errorMessage += ", genre";
        } else {
          errorMessage += "genre";
        }

        count++;
      }
      if (price === "") {
        if (count > 0) {
          errorMessage += ", price";
        } else {
          errorMessage += "price";
        }

        count++;
      }

      setError(`All fields are required: ${errorMessage}`);
    }
  };

  return (
    <div>
      {error ? <div className="error mb-20">{error}</div> : null}
      <div className="book-card mb-20">
        <div className="title">Add a book to your library:</div>
        <div className="book-details">
          <div className="detail-category">Title:</div>
          <input value={title} onChange={addTitle}></input>
        </div>
        <div className="book-details">
          <div className="detail-category">Author:</div>
          <input value={author} onChange={addAuthor}></input>
        </div>
        <div className="book-details">
          <div className="detail-category">Genre:</div>
          <input value={genre} onChange={addGenre}></input>
        </div>
        <div className="book-details">
          <div className="detail-category">Price:</div>
          <input value={price} onChange={addPrice}></input>
        </div>
        <button onClick={submitBook}>Add Book</button>
      </div>
    </div>
  );
};

export default BookForm;
