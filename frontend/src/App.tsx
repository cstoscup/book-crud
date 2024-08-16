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
        console.log(data);
        setBooks(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (books.length === 0) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h1>My Library</h1>
        <Books books={books} />
      </div>
    );
  }
}

export default App;
