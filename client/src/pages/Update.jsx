import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/styles.css";
import { useLocation } from "react-router-dom";

const Update = () => {
  const [book, SetBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate()
  const location = useLocation()

  const bookId = location.pathname.split('/')[2]


  const handleChange = (e) => {
    SetBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8000/books/"+bookId, book);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(book);

  return (
    <div className="form">
      <h1>Update the Book</h1>
      <input
        type="text"
        name="title"
        id=""
        onChange={handleChange}
        placeholder="title"
      />
      <input
        type="text"
        name="desc"
        id=""
        onChange={handleChange}
        placeholder="desc"
      />
      <input
        type="number"
        name="price"
        id=""
        onChange={handleChange}
        placeholder="price"
      />
      <input
        type="text"
        name="cover"
        id=""
        onChange={handleChange}
        placeholder="cover"
      />
      <button onClick={handleClick}>Update</button>
    </div>
  );
};

export default Update;
