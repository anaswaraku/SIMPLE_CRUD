import React, { useState } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import '../assets/styles.css';

const Add = () => {
    const [book, SetBook] = useState({
        title:"",
        desc:"",
        price:null,
        cover:""
    });

const navigate = useNavigate()

  const handleChange = (e) =>{
    SetBook(prev =>({...prev,[e.target.name]:e.target.value}));
  };
  const handleClick = async (e) =>{
    e.preventDefault()
    try{
        await axios.post("http://localhost:8000/books", book)
        navigate("/")
    }catch(err){
        console.log(err)
    }
  }


  console.log(book);

  return (
    <div className="form">
      <h1>Add New Book</h1>
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
      <button onClick={handleClick}>Add</button>
    </div>
  );
}

export default Add