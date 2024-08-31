import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Books from "./components/Books";

export type Book = {
  author: string;
  genre: string;
  id: number;
  price: string;
  title: string;
};

function App() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/book")
      .then((response) => {
        const data = response.data;
        setBooks(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>My Library</h1>
      <form action="http://localhost:3000/book" method="post">
        <label>Title:</label>
        <input type="text" name="title" />
        <label>Author:</label>
        <input type="text" name="author" />
        <label>Genre:</label>
        <input type="text" name="genre" />
        <label>Price:</label>
        <input type="text" name="price" />
        <input type="button" value="Add Book" onClick={submitForm} />
      </form>
      {books.length === 0 ? <div>Loading...</div> : <Books books={books} />}
    </div>
  );
}

export default App;
