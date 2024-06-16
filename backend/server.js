const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
})

app.get("/", (req, res) => {
    const sql = "SELECT * FROM tarea";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    });
});

app.post('/create', (req, res) => {
    const sql = "INSERT INTO tarea ('Titulo', 'Descripcion') VALUES (?)";     
    const values = [
        req.body.titulo,
        req.body.descripcion
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put('/update/:id', (req, res) => {
    const sql = "update tarea set 'Name' = ?, 'Descripcion' = ? where ID = ?";     
    const values = [
        req.body.titulo,
        req.body.descripcion
    ]
    const id = req.params.id;

    db.query(sql, [...values, id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.delete('/tarea/:id', (req, res) => {
    const sql = "DELETE FROM tarea WHERE ID = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})


app.listen(8081, () => {
    console.log("listening");
})
