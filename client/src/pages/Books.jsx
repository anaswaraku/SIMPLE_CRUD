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

  const handleDelete = async (id) =>{
    try{
        await axios.delete("http://localhost:8000/books/"+id);
        window.location.reload()
    }catch(err){
        console.log(err)
    }
  }


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
            <button className="delete" onClick={()=>handleDelete(book.id)}>delete</button>
            <button className="update"><Link to={`/update/${book.id}`}>update</Link></button> 
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
