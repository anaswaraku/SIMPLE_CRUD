import express from "express";// "type": "module",in package.json else error occur"SyntaxError: Cannot use import statement outside a module" . To manually run "node index.js"
import mysql from "mysql";
import cors from "cors";

const app = express();

// Create MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MySQL12@", // MySQL password
  database: "test", // Database name
});

app.use(express.json());//accepts from json file
app.use(cors());

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL!");
});

// Endpoint to respond with a basic message
app.get("/", (req, res) => {
  res.json("Hello, this is the backend");
}); 

// Endpoint to fetch all books
app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

// Endpoint to add a new book
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password'; in cmd for auth problem
app.post("/books", (req, res) => {
  //use postman API to check
  const { title, desc, price,cover } = req.body;
  const q = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?,?,?,?)";
  const values = [
    req.body.title, 
    req.body.desc, 
    req.body.price, 
    req.body.cover,
];

  db.query(q, values, (err, data) => {
    if (err) return res.json(err); 
    return res.status(201).json("Book added successfully");
  });
});


app.delete("/books/:id",(req,res)=>{
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id= ?"

    db.query(q, [bookId],(err, data) =>{
        if (err) return res.json(err); 
        return res.status(201).json("Book deleted successfully");
    })
})

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ? ";

   const values = [
     req.body.title,
     req.body.desc,
     req.body.price,
     req.body.cover,
   ];

  db.query(q, [...values,bookId], (err, data) => {
    if (err) return res.json(err);
    return res.status(201).json("Book updated successfully");
  });
});


// Start the server
app.listen(8000, () => {
  console.log("Connected to backend on port 8000!"); //"start": "nodemon index.js" in package.json file automatically starts "npm start"
});
