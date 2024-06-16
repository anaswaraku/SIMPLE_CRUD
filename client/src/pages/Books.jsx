import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../assets/styles.css";

const Books = () => {
  const [books, SetBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8000/books");
        SetBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  return (
    <div>
      <h1>Books</h1>
      <div className="books">
        {books.map((book) => (
          <div className="book" key={book.id}>
            {book.cover && <img src={book.cover} alt={book.title} />}
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>{book.price}</span>
          </div>
        ))}
      </div>
      <button>
        <Link to="/add">Add New Book</Link>
      </button>
    </div>
  );
};

export default Books;
